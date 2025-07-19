import { Component, input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { BirdDataService } from 'src/app/services/bird-data.service';
import { Detection } from 'src/app/models/graphql.models';

@Component({
  selector: 'live-detection',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './live-detection.html',
  styleUrls: ['./live-detection.scss'],
})
export class LiveDetectionsComponent implements OnInit, OnDestroy {
  stationId = input.required<number>();

  public detections: Detection[] = [];
  private detectionsSubscription: Subscription | undefined;
  private gqlSubscription: Subscription | undefined;

  constructor(private birdDataService: BirdDataService) { }

  ngOnInit(): void {
    // Start listening for new detections from the service.
    if (this.stationId() > 0) {
      this.gqlSubscription = this.birdDataService.subscribeToNewDetections(this.stationId());

      // Subscribe to the stream of new detections to update the UI.
      this.detectionsSubscription = this.birdDataService.newDetections$.subscribe(
        (newDetections) => {
          if (newDetections && newDetections.length > 0) {
            this.detections.unshift(...newDetections);

            if (this.detections.length > 20) {
              this.detections.splice(20);
            }
          }
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.detectionsSubscription?.unsubscribe();
    this.gqlSubscription?.unsubscribe();
  }
}