import { WeatherReading } from 'src/app/models/station.model';
import { Component, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'station-weather',
  standalone: true,
  templateUrl: './weather.html',
  styleUrl: './weather.scss',
  imports: [CommonModule, FontAwesomeModule],
})
export class WeatherComponent {
  weather = input.required<WeatherReading>();
}
