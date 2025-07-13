import { Component, Input } from '@angular/core';
import { BirdDetection } from '../../models/station-detection.model';

@Component({
  selector: 'bird-detection',
  standalone: true,
  templateUrl: './bird-detection.html',
  styleUrl: './bird-detection.css'
})
export class BirdDetectionComponent {
 @Input() detection!: BirdDetection;  

}
