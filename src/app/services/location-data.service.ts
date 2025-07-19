import { Injectable, signal, WritableSignal } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LocationService {
    public userCoords: WritableSignal<GeolocationCoordinates | null> = signal(null);

    constructor() {
        this.getUserLocation().subscribe(coords => {
            this.userCoords.set(coords);
        });
    }


    getUserLocation(): Observable<GeolocationCoordinates> {
        const options: PositionOptions = {
            enableHighAccuracy: true,
            timeout: 60000, // Wait 10 seconds
            maximumAge: 0, // Don't use a cached position
        };

        return new Observable(observer => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        observer.next(position.coords);
                        observer.complete();
                    },
                    error => {
                        observer.error(error);
                    },
                    options
                );
            } else {
                observer.error('Geolocation is not supported by this browser.');
            }
        });
    }

    degreesToRadians(degrees: number): number {
        return degrees * Math.PI / 180;
    }

    distanceInMilesBetweenEarthCoordinates(lat2: number, lon2: number): number {
        const userCoords = this.userCoords();
        if (!userCoords) {
            return -1;
        }
        var earthRadiusMi = 3958.7564;

        var dLat = this.degreesToRadians(lat2 - userCoords.latitude);
        var dLon = this.degreesToRadians(lon2 - userCoords.longitude);

        var localUserLat = this.degreesToRadians(userCoords.latitude);
        lat2 = this.degreesToRadians(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(localUserLat) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return earthRadiusMi * c;
    }

    convertCoordsToDMS(lat: number, lon: number): { lat: string; lon: string } {
        return {
            lat: this.toDMS(lat, 'N', 'S'),
            lon: this.toDMS(lon, 'E', 'W'),
        };
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