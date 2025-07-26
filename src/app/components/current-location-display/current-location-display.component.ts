import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { Observable } from 'rxjs';
import { Coordinates } from '../../models/coordinates.model';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-current-location-display',
  standalone: true,
  imports: [CommonModule, MatDividerModule],
  templateUrl: './current-location-display.component.html',
  styleUrls: ['./current-location-display.component.scss']
})
export class CurrentLocationDisplayComponent {
  currentLocation$: Observable<Coordinates | null>;

  constructor(private locationService: LocationService) {
    this.currentLocation$ = this.locationService.location$;
  }
}