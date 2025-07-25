import { Component, input, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Detection } from 'src/app/models/graphql.models';
import { BirdDataService } from 'src/app/services/bird-data.service';
import { register } from 'swiper/element/bundle';
import { MatButtonModule } from '@angular/material/button';

// register Swiper custom elements
register();

@Component({
  selector: 'bird-detection',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './bird-detection.html',
  styleUrl: './bird-detection.css',
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BirdDetectionComponent {
  stationId = input.required<number>();
  last = input.required<boolean>();

  detections: Detection[] = [];
  loading: boolean = false;
  loadingMessage: string = '';
  error: string = '';

   constructor(
        private birdDataService: BirdDataService,        
    ) { }

  ngOnInit(): void {
    this.fetchLastDetection();
  }


 fetchLastDetection(): void{
        if(this.stationId){
            this.loading = true;
            this.loadingMessage = 'Loading detections...';
            this.error = '';
            this.birdDataService.getDetectionsForStation(this.stationId(), this.last()).subscribe({
                next: (detections) => {
                    const latestDetectionsBySpecies = new Map<number, Detection>();

                    detections.forEach((detection: Detection) => {
                        const speciesId = parseInt(detection.species.id);
                        const existingDetection = latestDetectionsBySpecies.get(speciesId);
                
                        if (!existingDetection || new Date(detection.timestamp) > new Date(existingDetection.timestamp)) {
                            latestDetectionsBySpecies.set(speciesId, detection);
                        }
                    });

                    this.detections = Array.from(latestDetectionsBySpecies.values())
                        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
                    this.loading = false;
                    this.loadingMessage = '';
                },
                error: (err) => {
                  console.error('Error fetching detections:', err);
                    this.loading = false;
                    this.error = 'Failed to fetch detections. Please try again later.';
                    this.loadingMessage = '';
                }
            });
        }
    }

}
