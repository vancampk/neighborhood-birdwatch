import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { ThemeService, THEMES } from '../../services/theme.service';
import { SettingsService, AppSettings } from '../../services/settings.service';
import { CurrentLocationDisplayComponent } from "../current-location-display/current-location-display.component";
import { LocalStorageInspectorComponent } from "../local-storage-inspector/local-storage-inspector.component";

@Component({
  selector: 'app-settings-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRadioModule,
    CurrentLocationDisplayComponent,
    LocalStorageInspectorComponent
],
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.scss']
})
export class SettingsPanelComponent implements OnInit {
  availableThemes = THEMES;
  settings!: AppSettings;

  constructor(
    private themeService: ThemeService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.settings = this.settingsService.getSettings();
  }

  onSettingsChange(): void {
    // This single method handles changes from all controls via ngModel.
    this.settingsService.updateSettings(this.settings);
  }
}