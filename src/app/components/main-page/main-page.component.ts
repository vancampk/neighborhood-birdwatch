import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LocationService, Coordinates } from '../../services/location.service';
import { LocationSelectorComponent } from '../location-selector/location-selector.component';
import { StationsComponent } from '../stations/stations';

@Component({
  selector: 'main-page',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    LocationSelectorComponent,
    StationsComponent
  ],
  templateUrl: './main-page.component.html',
})
export class MainPageComponent implements OnInit, OnDestroy {
  currentLocation: Coordinates | null = null;
  private subscriptions = new Subscription();

  constructor(
    private locationService: LocationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.locationService.location$.subscribe(location => {
        this.currentLocation = location;
        if (!location) {
          this.openLocationSelector();
        }
      })
    );
  }

  openLocationSelector(): void {
    if (this.dialog.openDialogs.length === 0) {
      this.dialog.open(LocationSelectorComponent, {
        width: 'clamp(300px, 90vw, 500px)',
        disableClose: true, // User must choose a location
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}