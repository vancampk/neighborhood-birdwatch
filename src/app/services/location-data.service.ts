import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class LocationService {
    userLat: number = 0;
    userLon: number = 0;

    constructor() { 
        this.getUserLocation().subscribe(coords => {
            this.userLat = coords.latitude;
            this.userLon = coords.longitude;
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
        var earthRadiusMi = 3958.7564;

        var dLat = this.degreesToRadians(lat2 - this.userLat);
        var dLon = this.degreesToRadians(lon2 - this.userLon);

        var localUserLat = this.degreesToRadians(this.userLat);
        lat2 = this.degreesToRadians(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(localUserLat) * Math.cos(lat2);
            console.log("a:" + a);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        console.log(earthRadiusMi * c  );
        return earthRadiusMi * c;
    }
}