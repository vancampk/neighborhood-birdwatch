import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LocationService } from '../../services/location.service';
import { LocationSelectorComponent } from '../location-selector/location-selector.component';

@Component({
  selector: 'location-button',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './global-location-button.component.html',
  styleUrls: ['./global-location-button.component.scss']
})
export class GlobalLocationButtonComponent implements OnInit, OnDestroy {
  isLocationSet = false;
  private subscriptions = new Subscription();

  constructor(
    private dialog: MatDialog,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.locationService.location$.subscribe(location => {
        this.isLocationSet = !!location;
      })
    );
  }

  openLocationSelector(): void {
    if (this.dialog.openDialogs.length === 0) {
      this.dialog.open(LocationSelectorComponent, {
        width: 'clamp(300px, 90vw, 500px)',
        disableClose: false, // Allow user to cancel changing location
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}