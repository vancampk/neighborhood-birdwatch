import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SettingsService, FavoriteStation } from '../../services/settings.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss']
})
export class FavoriteButtonComponent implements OnInit {
  @Input({ required: true }) stationId!: number;
  @Input({ required: true }) stationName!: string;

  isFavorite$!: Observable<boolean>;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.isFavorite$ = this.settingsService.settings$.pipe(
      map(settings => settings.stationFavorites?.some(fav => fav.id === this.stationId) ?? false)
    );
  }

  toggleFavorite(event: MouseEvent): void {
    event.stopPropagation(); // Prevents parent elements from also being clicked
    this.settingsService.toggleFavoriteStation(this.stationId, this.stationName);
  }
}