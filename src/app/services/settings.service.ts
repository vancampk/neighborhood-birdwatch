import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Coordinates } from '../models/coordinates.model';

export type LocationPreference = 'prompt' | 'saved-prompt';

export interface FavoriteStation {
  id: number;
  name: string;
}

export interface AppSettings {
  theme: string;
  preferredLocationMethod: LocationPreference;
  rememberSettings: boolean;
  location?: Coordinates;
  stationFavorites?: FavoriteStation[];
}

export const SETTINGS_KEY = 'neighborhood-birdwatch-settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private readonly defaultSettings: AppSettings = {
    theme: 'default-theme',
    preferredLocationMethod: 'prompt',
    rememberSettings: false,
    stationFavorites: [],
  };

  private settingsSubject = new BehaviorSubject<AppSettings>(this.defaultSettings);
  public settings$ = this.settingsSubject.asObservable();

  constructor() {
    this.loadSettings();
  }

  private loadSettings(): void {
    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    const settings = savedSettings ? JSON.parse(savedSettings) : this.defaultSettings;
    // Ensure loaded settings have all keys from default settings
    const mergedSettings = { ...this.defaultSettings, ...settings };
    this.settingsSubject.next(mergedSettings);
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
    if (currentSettings.rememberSettings && newSettings.rememberSettings === false) {
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

  toggleFavoriteStation(stationId: number, stationName:string): void {
    const station = { id: stationId, name: stationName };
    const settings = this.getSettings();
    const favorites = settings.stationFavorites || [];
    const existingIndex = favorites.findIndex(fav => fav.id === station.id);

    if (existingIndex > -1) {
      // Station is already a favorite, so remove it.
      const newFavorites = favorites.filter(fav => fav.id !== station.id);
      this.updateSettings({ stationFavorites: newFavorites });
    } else {
      // Station is not a favorite, so add it.
      const newFavorites = [...favorites, station];
      this.updateSettings({ stationFavorites: newFavorites });
    }
  }
}