import { Component, OnDestroy, OnInit } from '@angular/core';
import { BirdDataService } from '../../services/bird-data.service';
import { Station } from '../../models/graphql.models';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LocationService } from '../../services/location.service';
import { Coordinates } from '../../models/coordinates.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FavoriteButtonComponent } from '../favorite-button/favorite-button.component';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.html',
  styleUrls: ['./stations.css'],
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FavoriteButtonComponent,
  ],
})
export class StationsComponent implements OnInit, OnDestroy {
  nearbyStations: Station[] = [];
  loadingMessage: string = '';
  error: string | null = null;

  private subscriptions = new Subscription();

  constructor(
    private birdDataService: BirdDataService,
    private locationService: LocationService,
  ) {}

  ngOnInit(): void {
    // Subscribe to the stations list from the data service
    this.subscriptions.add(
      this.birdDataService.stations$.subscribe((stations) => {
        this.nearbyStations = stations;
        // If we were loading and now have stations, clear the loading message.
        if (this.loadingMessage && stations.length > 0) {
          this.loadingMessage = '';
        }
      }),
    );

    // Subscribe to location changes from the location service
    this.subscriptions.add(
      this.locationService.location$.subscribe((location) => {
        if (location) {
          this.fetchNearbyStations(location);
        } else {
          // If location is cleared, reset the state of this component
          this.nearbyStations = [];
          this.error = null;
          this.loadingMessage = '';
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getStationDistance(station: Station): number {
    return this.locationService.distanceInMilesBetweenEarthCoordinates(
      station.coords!.lat,
      station.coords!.lon,
    );
  }

  fetchNearbyStations(coords: Coordinates): void {
    this.error = null;
    this.loadingMessage = 'Loading nearby stations...';
    this.birdDataService
      .getNearbyStations(coords.latitude, coords.longitude)
      .subscribe({
        next: () => {
          this.loadingMessage = '';
          if (this.birdDataService.getStationsValue().length === 0) {
            this.error = 'No nearby stations found within the search radius.';
          }
        },
        error: (err) => {
          console.error('Error fetching stations:', err);
          this.loadingMessage = '';
          this.error =
            'Failed to fetch nearby stations. Please try again later.';
        },
      });
  }
}
