import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { SettingsService, SETTINGS_KEY } from '../../services/settings.service';

@Component({
  selector: 'app-local-storage-inspector',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './local-storage-inspector.component.html',
  styleUrls: ['./local-storage-inspector.component.scss'],
})
export class LocalStorageInspectorComponent implements OnInit, OnDestroy {
  readonly storageKey = SETTINGS_KEY;
  storedSettings: any = null;
  hasData: boolean = false;
  private settingsSub!: Subscription;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    // Subscribe to settings changes to keep the inspector's view live.
    // This will trigger an initial read and subsequent reads on any change.
    this.settingsSub = this.settingsService.settings$.subscribe(() => {
      this.readFromLocalStorage();
    });
  }

  readFromLocalStorage(): void {
    try {
      const rawData = localStorage.getItem(this.storageKey);
      this.hasData = !!rawData;
      this.storedSettings = rawData ? JSON.parse(rawData) : null;
    } catch (e) {
      console.error('Error reading or parsing from local storage', e);
      this.storedSettings = {
        error: 'Could not parse data from local storage.',
      };
      this.hasData = true;
    }
  }

  clearStorage(): void {
    this.settingsService.resetToDefaults();
  }

  ngOnDestroy(): void {
    this.settingsSub.unsubscribe();
  }
}
