import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BirdDataService } from '../../services/bird-data.service';
import { Detection } from 'src/app/models/graphql.models';
import { Station } from 'src/app/models/graphql.models';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StationDetails } from "../station-details/station-details";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { OpenMeteoWeatherReading } from 'src/app/models/open-meteo.model';
import { BirdDetectionComponent } from "../bird-detection/bird-detection";
import { MatIconModule } from '@angular/material/icon';



@Component({
    selector: 'app-station-detections',
    templateUrl: './station.html',
    styleUrls: ['./station.css'],
    imports: [
        CommonModule,
        RouterLink,
        StationDetails,
        MatCardModule,
        MatButtonModule,
        BirdDetectionComponent,
        MatIconModule
    ],
})
export class StationDetectionsComponent implements OnInit {
    detection: Detection | null = null;
    loadingMessage: string = '';
    error: string = '';
    stationId: number = 0;
    station: Station | null = null;
    weather!: OpenMeteoWeatherReading;

    constructor(
        private route: ActivatedRoute,
        private birdDataService: BirdDataService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.fetchStation();
    }

    fetchStation(): void {
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

    goBackToStations(): void {
        this.router.navigate(['/']);
    }
}
