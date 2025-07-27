import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, Observer, BehaviorSubject, of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SettingsService } from './settings.service';
import { Coordinates } from '../models/coordinates.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private locationSubject = new BehaviorSubject<Coordinates | null>(null);
  public location$ = this.locationSubject.asObservable();

  private mapboxApiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

  constructor(
    private http: HttpClient,
    private settingsService: SettingsService,
  ) {
    const settings = this.settingsService.getSettings();
    if (settings.rememberSettings && settings.location) {
      this.locationSubject.next(settings.location);
    }
  }

  setLocation(coords: Coordinates) {
    this.locationSubject.next(coords);
    this.settingsService.updateSettings({ location: coords });
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
              longitude: position.coords.longitude,
            });
            observer.complete();
          },
          (error: GeolocationPositionError) => observer.error(error),
        );
      } else {
        observer.error('Geolocation is not supported by this browser.');
      }
    });
  }

  getCoordinatesForCity(city: string): Observable<Coordinates> {
    if (!environment.mapboxAccessToken) {
      return throwError(
        () => new Error('Mapbox access token is not configured.'),
      );
    }
    const url = `${this.mapboxApiUrl}/${encodeURIComponent(city)}.json?access_token=${environment.mapboxAccessToken}&limit=1`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        if (response.features && response.features.length > 0) {
          const feature = response.features[0];
          const [longitude, latitude] = feature.center;

          const coords: Coordinates = { latitude, longitude };

          // The `text` property of the feature is often the most specific place name (the city).
          coords.city = feature.text;

          // The `context` array contains parent administrative areas.
          const region = feature.context?.find((c: any) =>
            c.id.startsWith('region'),
          );
          if (region) {
            coords.state = region.text;
          }
          return coords;
        }
        throw new Error('City not found.');
      }),
      catchError(() =>
        throwError(
          () => new Error('Could not find coordinates for the specified city.'),
        ),
      ),
    );
  }

  /**
   * Performs a reverse geocoding lookup to find a city and state for a given set of coordinates.
   * @param coords The coordinates to look up.
   * @returns An observable of the Coordinates, now including city and state if found.
   */
  getCityForCoordinates(coords: Coordinates): Observable<Coordinates> {
    if (!environment.mapboxAccessToken) {
      return throwError(
        () => new Error('Mapbox access token is not configured.'),
      );
    }
    const url = `${this.mapboxApiUrl}/${coords.longitude},${coords.latitude}.json?types=place&access_token=${environment.mapboxAccessToken}`;

    return this.http.get<any>(url).pipe(
      map((response) => {
        if (response.features && response.features.length > 0) {
          const feature = response.features[0];
          const updatedCoords: Coordinates = { ...coords };

          updatedCoords.city = feature.text;

          const region = feature.context?.find((c: any) =>
            c.id.startsWith('region'),
          );
          if (region) {
            updatedCoords.state = region.text;
          }
          return updatedCoords;
        }
        throw new Error('Could not determine city for coordinates.');
      }),
      catchError(() =>
        throwError(() => new Error('Failed to fetch city for coordinates.')),
      ),
    );
  }

  /**
   * Gets the user's current position from the browser, reverse geocodes it to find the city/state,
   * and sets it as the current location for the application.
   * @returns An observable that completes with the fully populated Coordinates.
   */
  fetchAndSetCurrentUserLocation(): Observable<Coordinates> {
    return this.getCurrentPosition().pipe(
      // Use switchMap to chain the geocoding call.
      // If a new request starts, the previous geocoding call is cancelled.
      switchMap((coords) => this.getCityForCoordinates(coords)),
      // Use tap for the side-effect of setting the location in the service.
      tap((fullCoords) => this.setLocation(fullCoords)),
      catchError((error) => {
        // Log the error for debugging purposes.
        console.error('Could not fetch and set user location:', error);
        // Re-throw the original error to be handled by the component.
        return throwError(() => error);
      }),
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

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(localUserLat) *
        Math.cos(lat2);
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
    return (degrees * Math.PI) / 180;
  }

  private toDMS(
    coord: number,
    positiveDir: string,
    negativeDir: string,
  ): string {
    const direction = coord >= 0 ? positiveDir : negativeDir;
    const absolute = Math.abs(coord);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = Math.floor((minutesNotTruncated - minutes) * 60);
    return `${degrees}° ${minutes}' ${seconds}" ${direction}`;
  }
}
