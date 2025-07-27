import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LocationService } from '../../services/location.service';
import { LocationSelectorComponent } from '../location-selector/location-selector.component';
import { SettingsPanelComponent } from '../settings/settings-panel.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-global-controls',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './global-controls.component.html',
  styleUrls: ['./global-controls.component.scss']
})
export class GlobalControlsComponent implements OnInit, OnDestroy {
  menuOpen = false;
  private subscriptions = new Subscription();

  constructor(
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void { }

  openLocationSelector(): void {
    if (this.dialog.openDialogs.length > 0) { return; }

    const dialogRef = this.dialog.open(LocationSelectorComponent, {
      width: 'clamp(300px, 90vw, 500px)',
      disableClose: false,
    });

    this.menuOpen = true;
    this.subscriptions.add(
      dialogRef.afterClosed().subscribe(() => {
        this.menuOpen = false;
      })
    );
  }

  openSettingsPanel(): void {
    if (this.dialog.openDialogs.length > 0) { return; }

    const dialogRef = this.dialog.open(SettingsPanelComponent, {
      width: 'clamp(300px, 90vw, 500px)',
      minHeight: '300px',
      panelClass: 'settings-dialog-container'
    });

    this.menuOpen = true;
    this.subscriptions.add(
      dialogRef.afterClosed().subscribe(() => {
        this.menuOpen = false;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}