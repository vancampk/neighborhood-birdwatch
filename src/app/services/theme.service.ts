import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { SettingsService } from './settings.service';

export const THEMES = [
  'default-theme',
  'blue-jay-theme',
  'cardinal-theme',
  'goldfinch-theme',
  'downy-woodpecker-theme',
  'black-capped-chickadee-theme',
  'hummingbird-theme',
  'robin-theme',
  'mallard-duck-theme',
  'loon-theme',
  'painted-bunting-theme',
  'lazuli-bunting-theme'
];

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;

  constructor(
    rendererFactory: RendererFactory2,
    private settingsService: SettingsService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.settingsService.settings$.subscribe(settings => {
      this.updateBodyClass(settings.theme);
    });
  }

  private updateBodyClass(themeName: string) {
    // Remove all possible theme classes
    THEMES.forEach(theme => {
      this.renderer.removeClass(document.body, theme);
    });
    // Add the new theme class
    this.renderer.addClass(document.body, themeName);
  }
}