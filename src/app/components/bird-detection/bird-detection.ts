import { Component, Input } from '@angular/core';
import { Detection  } from 'src/app/models/graphql.models';

@Component({
  selector: 'bird-detection',
  standalone: true,
  templateUrl: './bird-detection.html',
  styleUrl: './bird-detection.css'
})
export class BirdDetectionComponent {
 @Input() detection!: Detection;  

}
