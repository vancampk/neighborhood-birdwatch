import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Coordinates } from '../models/coordinates.model';

export type LocationPreference = 'prompt' | 'saved-prompt';

export interface AppSettings {
  theme: string;
  preferredLocationMethod: LocationPreference;
  rememberSettings: boolean;
  location?: Coordinates;
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
}