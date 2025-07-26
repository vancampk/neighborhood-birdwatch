import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isSlightlyDarker = new BehaviorSubject<boolean>(false);
  isSlightlyDarker$ = this.isSlightlyDarker.asObservable();
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadInitialTheme();
  }

  private loadInitialTheme() {
    const savedTheme = localStorage.getItem('isSlightlyDarker');
    const isDark = savedTheme === 'true';
    this.isSlightlyDarker.next(isDark);
    this.updateBodyClass(isDark);
  }

  toggleSlightlyDarkerTheme(isDark: boolean) {
    this.isSlightlyDarker.next(isDark);
    localStorage.setItem('isSlightlyDarker', String(isDark));
    this.updateBodyClass(isDark);
  }

  private updateBodyClass(isDark: boolean) {
    isDark ? this.renderer.addClass(document.body, 'slightly-darker-mode') : this.renderer.removeClass(document.body, 'slightly-darker-mode');
  }
}