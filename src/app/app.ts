import { Component, OnInit } from '@angular/core';
import { GlobalControlsComponent } from './components/global-controls/global-controls.component';
import { ThemeService } from './services/theme.service';
import { AuthService } from './services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  providers: [GlobalControlsComponent, MatIconModule],
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected title = 'bird-watcher-app';
  
  constructor(
    private themeService: ThemeService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log('App initialized');
    
    // Let the auth service initialize naturally through dependency injection
    // Don't call checkAuth() here to avoid triggering login immediately
    
    // Optional: Subscribe to auth status for logging
    this.authService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      console.log('App: Auth status changed to:', isAuthenticated);
    });
  }
}
