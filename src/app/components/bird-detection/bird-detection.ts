import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Detection } from 'src/app/models/graphql.models';
import { BirdDataService } from 'src/app/services/bird-data.service';

@Component({
  selector: 'bird-detection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bird-detection.html',
  styleUrl: './bird-detection.css'
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
                    console.log(detections);
                    this.detections = detections;
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
