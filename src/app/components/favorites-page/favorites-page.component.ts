import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SettingsService } from '../../services/settings.service';
import { BirdDetectionComponent } from '../bird-detection/bird-detection';
import { MatCard } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

// This interface defines the structure for a favorite station's basic info.
interface FavoriteStationInfo {
  stationName: string;
  stationId: number;
}

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatProgressSpinnerModule,
    BirdDetectionComponent,
    MatCard,
    MatIconModule,
  ],
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss'],
})
export class FavoritesPageComponent implements OnInit {
  // This observable will stream the list of favorite stations.
  // The template will use this stream with an async pipe.
  favoriteStations$!: Observable<FavoriteStationInfo[]>;
  isLoading = true;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.favoriteStations$ = this.settingsService.settings$.pipe(
      // Map the settings to an array of favorite stations with the structure our template expects.
      map((settings) =>
        (settings.stationFavorites || []).map((fav) => ({
          stationId: fav.id,
          stationName: fav.name,
        })),
      ),
      // Once the first list of favorites is emitted, we can stop showing the main loader.
      tap(() => (this.isLoading = false)),
    );
  }
}
