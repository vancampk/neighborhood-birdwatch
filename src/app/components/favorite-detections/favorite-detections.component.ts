import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, of, forkJoin } from 'rxjs';
import { switchMap, map, catchError, finalize, tap } from 'rxjs/operators';
import { SettingsService } from '../../services/settings.service';
import { BirdDataService } from '../../services/bird-data.service';
import { Detection } from '../../models/graphql.models';

// This interface will help structure our data in the component
interface StationDetections {
  stationName: string;
  stationId: number;
  detections: Detection[];
  error?: string;
  isLoading?: boolean;
}

@Component({
  selector: 'app-favorite-detections',
  standalone: true,
  imports: [CommonModule, RouterLink, MatListModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: 'favorite-detections.component.html',
  styleUrls: ['favorite-detections.component.css']
})
export class FavoriteDetectionsComponent implements OnInit {
  detectionsByStation$!: Observable<StationDetections[]>;
  isLoading = true;

  constructor(
    private settingsService: SettingsService,
    private birdDataService: BirdDataService
  ) {}

  ngOnInit(): void {
    this.detectionsByStation$ = this.settingsService.settings$.pipe(
      map(settings => settings.stationFavorites || []),
      tap(() => this.isLoading = true),
      switchMap(favorites => {
        if (favorites.length === 0) {
          this.isLoading = false;
          return of([]); // Return an empty array if there are no favorites
        }

        const stationIds = favorites.map(fav => fav.id);

        return this.birdDataService.getDetectionsForStations(stationIds, true).pipe(
          map(allDetections => {
            // Group detections by station ID using a more functional and safer approach
            const detectionsByStationId = allDetections.reduce((acc, detection) => {
              // Safely access station ID and parse it
              if (detection?.station?.id) {
                const stationId = parseInt(detection.station.id, 10);
                if (!isNaN(stationId)) {
                  const existing = acc.get(stationId) || [];
                  acc.set(stationId, [...existing, detection]);
                }
              }
              return acc;
            }, new Map<number, Detection[]>());

            // Map the original favorites list to the structure required by the template
            return favorites.map(favStation => ({
              stationName: favStation.name,
              stationId: favStation.id,
              detections: detectionsByStationId.get(favStation.id) || []
            }));
          }),
          catchError(() => of(favorites.map(fav => ({ stationName: fav.name, stationId: fav.id, detections: [], error: 'Could not load detections.' })))),
          finalize(() => this.isLoading = false)
        );
      })
    );
  }
}