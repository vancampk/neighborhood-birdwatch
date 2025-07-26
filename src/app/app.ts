import { Component } from '@angular/core';
import { GlobalControlsComponent } from './components/global-controls/global-controls.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  providers: [GlobalControlsComponent],
  styleUrl: './app.css'
})
export class App {
  protected title = 'bird-watcher-app';
}
