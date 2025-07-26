import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { LocationService } from '../../services/location.service';

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
    MatIconModule
  ],
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss']
})
export class LocationSelectorComponent {
  citySearch: string = '';
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private locationService: LocationService,
    public dialogRef: MatDialogRef<LocationSelectorComponent>
  ) {}

  useBrowserLocation() {
    this.isLoading = true;
    this.errorMessage = null;
    this.locationService.getCurrentPosition().subscribe({
      next: (coords) => {
        this.isLoading = false;
        this.locationService.setLocation(coords);
        this.dialogRef.close();
      },
      error: (err: GeolocationPositionError | string) => {
        this.isLoading = false;
        if (typeof err === 'string') {
          this.errorMessage = err;
        } else if (err.code === err.PERMISSION_DENIED) {
          this.errorMessage = 'Location permission was denied. Please enable it in your browser settings or search for a city.';
        } else {
          this.errorMessage = 'Could not get your location. Please try again or search for a city.';
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