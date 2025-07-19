import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BirdDataService } from '../../services/bird-data.service';
import { Detection } from 'src/app/models/graphql.models';
import { Station } from 'src/app/models/graphql.models';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WeatherComponent } from '../weather/weather';
import { StationDetails } from "../station-details/station-details";
import { MatCardModule } from '@angular/material/card';
import { WeatherService } from 'src/app/services/weather.service';
import { MatButtonModule } from '@angular/material/button';
import { OpenMeteoWeatherReading } from 'src/app/models/open-meteo.model';
import { LiveDetectionsComponent } from '../live-detection/live-detection';

@Component({
    selector: 'app-station-detections',
    templateUrl: './station.html',
    styleUrls: ['./station.css'],
    imports: [
        CommonModule,
        RouterLink,
        WeatherComponent,
        LiveDetectionsComponent,
        StationDetails,
        MatCardModule,
        MatButtonModule
    ],
})
export class StationDetectionsComponent implements OnInit {
    detections: Detection | null = null;
    loadingMessage: string = '';
    error: string = '';
    stationId: number = 0;
    station: Station | null = null;
    weather!: OpenMeteoWeatherReading;


    constructor(
        private route: ActivatedRoute,
        private birdDataService: BirdDataService,
        private weatherService: WeatherService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.fetchDetections();
    }

    fetchDetections(): void {
        const idParam = this.route.snapshot.paramMap.get('id');
        console.log(this.birdDataService.stations$);
        this.loadingMessage = 'Loading station details...';
        this.error = '';
        if (idParam) {
            this.stationId = +idParam;
            this.birdDataService.getStationById(this.stationId).subscribe({
                next: (station) => { // This subscription is now mainly for handling loading/error states
                    if (station) {
                        this.station = station;
                        this.loadingMessage = '';
                        this.fetchWeather();                            
                    }
                    else {
                        this.loadingMessage = '';
                        this.error = 'Station not found.';
                    }

                },
                error: (err) => {
                    console.error('Error fetching stations:', err);
                    this.loadingMessage = '';
                    this.error = 'Failed to fetch station. Please try again later.';
                }

            });

        } else {
            this.loadingMessage = '';
            this.error = 'Station ID not found in URL.';
        }
    }

    fetchWeather(): void {
        if(this.station){
            // get now date
            var date = new Date().toISOString();

            this.weatherService.getWeatherData(this.station.coords!.lat, this.station.coords!.lon, date).then(data => {
                this.weather = data;
            });
                ;
        }
    }


    goBackToStations(): void {
        this.router.navigate(['/']);
    }
}
