import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LocationService } from '../../services/location.service';
import { LocationSelectorComponent } from '../location-selector/location-selector.component';
import { StationsComponent } from '../stations/stations';
import { Coordinates } from '../../models/coordinates.model';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'main-page',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, StationsComponent],
  templateUrl: './main-page.component.html',
})
export class MainPageComponent implements OnInit, OnDestroy {
  currentLocation: Coordinates | null = null;
  private subscriptions = new Subscription();

  constructor(
    private locationService: LocationService,
    private dialog: MatDialog,
    private settingsService: SettingsService,
  ) {}

  ngOnInit(): void {
    const settings = this.settingsService.getSettings();
    this.subscriptions.add(
      this.locationService.location$.subscribe((location) => {
        this.currentLocation = location;
        if (!location) {
          this.openLocationSelector(true);
        } else if (settings.preferredLocationMethod === 'prompt') {
          this.openLocationSelector(false);
        }
      }),
    );
  }

  openLocationSelector(disableClose: boolean): void {
    if (this.dialog.openDialogs.length === 0) {
      this.dialog.open(LocationSelectorComponent, {
        width: 'clamp(300px, 90vw, 500px)',
        disableClose: disableClose,
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
