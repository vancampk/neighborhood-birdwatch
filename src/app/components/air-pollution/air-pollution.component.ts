import { AirPollution as AirPollutionModel } from 'src/app/models/station.model';
import { Component, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'station-air-pollution',
  standalone: true,
  templateUrl: './air-pollution.component.html',
  styleUrl: './air-pollution.component.scss',
  imports: [CommonModule],
})
export class AirPollutionComponent {
  airPollution = input.required<AirPollutionModel>();
}
