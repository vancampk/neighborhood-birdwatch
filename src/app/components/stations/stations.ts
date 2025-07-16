import { Component, OnDestroy, OnInit } from '@angular/core';
import { BirdDataService } from '../../services/bird-data.service';
import { Station } from 'src/app/models/graphql.models';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'
import { LocationService } from 'src/app/services/location-data.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-stations',
  templateUrl: './stations.html',
  styleUrls: ['./stations.css'],
  imports: [RouterLink, CommonModule, MatCardModule, MatButtonModule],
})
export class StationsComponent implements OnInit, OnDestroy {
  nearbyStations: Station[] = [];
  loadingMessage: string = '';
  error: string | null = null;
  userCoords: GeolocationCoordinates | null = null;
  private stationsSub?: Subscription;

  constructor(private birdDataService: BirdDataService, private locationService: LocationService) { }

  ngOnInit(): void {
    this.stationsSub = this.birdDataService.stations$.subscribe(stations => {
      this.nearbyStations = stations;
    });

    // Fetch stations only if the list is currently empty.
    if (this.birdDataService.getStationsValue().length === 0) {
      this.fetchNearbyStations();
    }
  }

  ngOnDestroy(): void {
    this.stationsSub?.unsubscribe();
  }

  getStationDistance(station: Station): number {
    return this.locationService.distanceInMilesBetweenEarthCoordinates(station.coords!.lat, station.coords!.lon);
  }

  userLocation(): GeolocationCoordinates | null {
    return this.userCoords;
  }

  fetchNearbyStations(): void {
    this.error = null;
    this.loadingMessage = 'Fetching your location...';

    this.locationService.getUserLocation().subscribe({
      next: (coords) => {
        this.userCoords = coords;
        this.loadingMessage = 'Loading nearby stations...';
        this.birdDataService.getNearbyStations(coords.latitude, coords.longitude).subscribe({
          next: (stations) => { // This subscription is now mainly for handling loading/error states
            if (stations.length === 0) {
              this.error = 'No nearby stations found.';
            }
            this.loadingMessage = '';
          },
          error: (err) => {
            console.error('Error fetching stations:', err);
            this.loadingMessage = '';
            this.error = 'Failed to fetch nearby stations. Please try again later.';
          }
        });
      },
      error: (locError) => {
        this.loadingMessage = '';
        if (locError instanceof GeolocationPositionError) {
          switch (locError.code) {
            case locError.PERMISSION_DENIED:
              this.error = 'Location access denied. Please enable location services for this site in your browser settings.';
              break;
            case locError.POSITION_UNAVAILABLE:
              this.error = 'Location information is unavailable. Please check your device settings and network connection.';
              break;
            case locError.TIMEOUT:
              this.error = 'Request to get user location timed out. Please try again.';
              break;
            default:
              this.error = 'An unknown error occurred while getting your location.';
          }
        } else {
          this.error = locError.message || 'Geolocation is not supported by this browser or an unknown error occurred.';
        }
      }
    });
  }
}