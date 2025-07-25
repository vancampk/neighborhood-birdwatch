import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OpenMeteoWeatherReading } from '../../models/open-meteo.model';
import { WeatherService } from '../../services/weather.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'station-weather',
  standalone: true,
  templateUrl: './weather.html',
  styleUrl: './weather.scss',
  imports: [CommonModule, FontAwesomeModule, MatButtonModule],
})
export class WeatherComponent {
  lattitude = input.required<number>();
  longitude = input.required<number>();

  weather!: OpenMeteoWeatherReading;
  loading: boolean = false;
  loadingMessage: string = '';
  error: string = '';


  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.fetchWeather();
  }

  fetchWeather(): void {
        if(this.lattitude() && this.longitude()){
            // get now date
            var date = new Date().toISOString();
            this.loading = true;
            this.error = '';
            this.loadingMessage = 'Loading weather data...';

            this.weatherService.getWeatherData(this.lattitude(), this.longitude(), date).then(data => {
                this.weather = data;
                this.loading = false;
                this.loadingMessage = '';
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                this.loading = false;
                this.error = 'Failed to fetch weather data. Please try again later.';
                this.loadingMessage = '';
            });
        }
    }
}
