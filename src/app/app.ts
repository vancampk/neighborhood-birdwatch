import { Component } from '@angular/core';
import { GlobalLocationButtonComponent } from "./components/global-controls/global-location-button.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  providers: [GlobalLocationButtonComponent],
  styleUrl: './app.css'
})
export class App {
  protected title = 'bird-watcher-app';
}
