import { Component } from '@angular/core';
import { GlobalControlsComponent } from './components/global-controls/global-controls.component';
import { ThemeService } from './services/theme.service';
import { MatIconModule } from "@angular/material/icon";


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  providers: [GlobalControlsComponent, MatIconModule],
  styleUrl: './app.css'
})
export class App {
  protected title = 'bird-watcher-app';
    constructor(private themeService: ThemeService) {}

}
