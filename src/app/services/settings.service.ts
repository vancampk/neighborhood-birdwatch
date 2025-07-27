import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Coordinates } from '../models/coordinates.model';

export type LocationPreference = 'prompt' | 'saved-prompt';

export interface FavoriteStation {
  id: number;
  name: string;
}

export interface AppSettings {
  rememberSettings: boolean;
  theme: string;
  preferredLocationMethod: LocationPreference;
  location?: Coordinates;
  stationFavorites?: FavoriteStation[];
}

export const SETTINGS_KEY = 'neighborhood-birdwatch-settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly defaultSettings: AppSettings = {
    rememberSettings: false,
    theme: 'default-theme',
    preferredLocationMethod: 'prompt',
    location: undefined,
    stationFavorites: [],
  };

  private settingsSubject = new BehaviorSubject<AppSettings>(
    this.defaultSettings,
  );
  public settings$ = this.settingsSubject.asObservable();

  constructor() {
    this.loadSettings();
  }

  private loadSettings(): void {
    const savedSettingsJson = localStorage.getItem(SETTINGS_KEY);
    let settingsToLoad = this.defaultSettings;

    if (savedSettingsJson) {
      const savedSettings = JSON.parse(savedSettingsJson);
      // Merge with defaults. This ensures new properties are added and, crucially,
      // re-orders the keys to match the `defaultSettings` definition.
      const mergedSettings = { ...this.defaultSettings, ...savedSettings };

      // If the user wants to remember settings, persist the potentially re-ordered
      // object back to storage immediately. This "cleans" the stored data.
      if (mergedSettings.rememberSettings) {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(mergedSettings));
      }
      settingsToLoad = mergedSettings;
    }
    this.settingsSubject.next(settingsToLoad);
  }

  private saveSettings(settings: AppSettings): void {
    if (settings.rememberSettings) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } else {
      localStorage.removeItem(SETTINGS_KEY);
    }
    this.settingsSubject.next(settings);
  }

  updateSettings(newSettings: Partial<AppSettings>): void {
    const currentSettings = this.getSettings();

    // If the user is turning OFF the "remember" setting, reset everything to default.
    if (
      currentSettings.rememberSettings &&
      newSettings.rememberSettings === false
    ) {
      this.resetToDefaults();
    } else {
      const updatedSettings = { ...currentSettings, ...newSettings };
      this.saveSettings(updatedSettings);
    }
  }

  getSettings(): AppSettings {
    return this.settingsSubject.getValue();
  }

  resetToDefaults(): void {
    localStorage.removeItem(SETTINGS_KEY);
    this.settingsSubject.next(this.defaultSettings);
  }

  toggleFavoriteStation(stationId: number, stationName: string): void {
    const station = { id: stationId, name: stationName };
    const settings = this.getSettings();
    const favorites = settings.stationFavorites || [];
    const existingIndex = favorites.findIndex((fav) => fav.id === station.id);

    if (existingIndex > -1) {
      // Station is already a favorite, so remove it.
      const newFavorites = favorites.filter((fav) => fav.id !== station.id);
      this.updateSettings({ stationFavorites: newFavorites });
    } else {
      // Station is not a favorite, so add it.
      const newFavorites = [...favorites, station];
      this.updateSettings({ stationFavorites: newFavorites });
    }
  }
}
