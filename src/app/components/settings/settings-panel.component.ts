import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { Observable } from 'rxjs';
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-settings-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatInputModule
],
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.scss']
})
export class SettingsPanelComponent implements OnInit {
  isSlightlyDarker$!: Observable<boolean>;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.isSlightlyDarker$ = this.themeService.isSlightlyDarker$;
  }

  onThemeToggle(event: { checked: boolean }): void {
    this.themeService.toggleSlightlyDarkerTheme(event.checked);
  }
}