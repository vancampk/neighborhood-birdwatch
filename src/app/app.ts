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
    private authService: AuthService // Just inject to ensure service is created
  ) {}

  ngOnInit() {
    // No need to manually initialize auth - it happens automatically in the service constructor
    console.log('App initialized');
  }
}
