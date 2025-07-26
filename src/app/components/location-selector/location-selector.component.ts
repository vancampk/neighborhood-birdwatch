import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { LocationService } from '../../services/location.service';
import { Coordinates } from '../../models/coordinates.model';
import { SettingsService, LocationPreference } from '../../services/settings.service';
import { MatDividerModule } from '@angular/material/divider';
import { CurrentLocationDisplayComponent } from '../current-location-display/current-location-display.component';

@Component({
  selector: 'app-location-selector',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    CurrentLocationDisplayComponent
  ],
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss']
})
export class LocationSelectorComponent implements OnInit {
  citySearch: string = '';
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private locationService: LocationService,
    public dialogRef: MatDialogRef<LocationSelectorComponent>
  ) {}

  ngOnInit(): void {}

  useBrowserLocation() {
    this.isLoading = true;
    this.errorMessage = null;
    this.locationService.fetchAndSetCurrentUserLocation().subscribe({
      next: () => {
        this.isLoading = false;
        this.dialogRef.close();
      },
      error: (err) => {
        this.isLoading = false;
        if (err instanceof GeolocationPositionError) {
          if (err.code === err.PERMISSION_DENIED) {
            this.errorMessage = 'Location permission was denied. Please enable it in your browser settings or search for a city.';
          } else {
            this.errorMessage = 'Could not get your location. Please try again or search for a city.';
          }
        } else if (err instanceof Error) {
          this.errorMessage = err.message;
        } else if (typeof err === 'string') {
          this.errorMessage = err;
        } else {
          this.errorMessage = 'An unknown error occurred while fetching your location.';
        }
      }
    });
  }

  searchForCity() {
    if (!this.citySearch.trim()) {
      return;
    }
    this.isLoading = true;
    this.errorMessage = null;
    this.locationService.getCoordinatesForCity(this.citySearch).subscribe({
      next: (coords) => {
        this.isLoading = false;
        this.locationService.setLocation(coords);
        this.dialogRef.close();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.message || 'Failed to find the city.';
      }
    });
  }
}