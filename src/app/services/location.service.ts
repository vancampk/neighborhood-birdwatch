import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, Observer, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private locationSubject = new BehaviorSubject<Coordinates | null>(null);
  public location$ = this.locationSubject.asObservable();

  private mapboxApiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

  constructor(
    private http: HttpClient,
  ) { }

  setLocation(coords: Coordinates) {
    this.locationSubject.next(coords);
  }

  getCurrentLocationValue(): Coordinates | null {
    return this.locationSubject.getValue();
  }

  getCurrentPosition(): Observable<Coordinates> {
    return new Observable((observer: Observer<Coordinates>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            observer.next({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
            observer.complete();
          },
          (error: GeolocationPositionError) => observer.error(error)
        );
      } else {
        observer.error('Geolocation is not supported by this browser.');
      }
    });
  }

  getCoordinatesForCity(city: string): Observable<Coordinates> {
    if (!environment.mapboxAccessToken) {
      return throwError(() => new Error('Mapbox access token is not configured.'));
    }
    const url = `${this.mapboxApiUrl}/${encodeURIComponent(city)}.json?access_token=${environment.mapboxAccessToken}&limit=1`;
    return this.http.get<any>(url).pipe(
      map(response => {
        if (response.features && response.features.length > 0) {
          const [longitude, latitude] = response.features[0].center;
          return { latitude, longitude };
        }
        throw new Error('City not found.');
      }),
      catchError(error => throwError(() => new Error('Could not find coordinates for the specified city.')))
    );
  }

  /**
   * Calculates the distance in miles between the user's current location and another set of coordinates.
   * Uses the Haversine formula.
   * @param lat2 Latitude of the destination point.
   * @param lon2 Longitude of the destination point.
   * @returns The distance in miles, or -1 if the user's location is not set.
   */
  distanceInMilesBetweenEarthCoordinates(lat2: number, lon2: number): number {
    const userCoords = this.getCurrentLocationValue();
    if (!userCoords) {
        return -1;
    }
    const earthRadiusMi = 3958.7564;

    const dLat = this.degreesToRadians(lat2 - userCoords.latitude);
    const dLon = this.degreesToRadians(lon2 - userCoords.longitude);

    const localUserLat = this.degreesToRadians(userCoords.latitude);
    lat2 = this.degreesToRadians(lat2);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(localUserLat) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadiusMi * c;
  }

  /**
   * Converts decimal coordinates to a Degrees, Minutes, Seconds (DMS) string format.
   * @param lat Latitude
   * @param lon Longitude
   * @returns An object with formatted lat and lon strings.
   */
  convertCoordsToDMS(lat: number, lon: number): { lat: string; lon: string } {
    return {
        lat: this.toDMS(lat, 'N', 'S'),
        lon: this.toDMS(lon, 'E', 'W'),
    };
  }

  private degreesToRadians(degrees: number): number {
      return degrees * Math.PI / 180;
  }

  private toDMS(coord: number, positiveDir: string, negativeDir: string): string {
      const direction = coord >= 0 ? positiveDir : negativeDir;
      const absolute = Math.abs(coord);
      const degrees = Math.floor(absolute);
      const minutesNotTruncated = (absolute - degrees) * 60;
      const minutes = Math.floor(minutesNotTruncated);
      const seconds = Math.floor((minutesNotTruncated - minutes) * 60);
      return `${degrees}° ${minutes}' ${seconds}" ${direction}`;
  }
}