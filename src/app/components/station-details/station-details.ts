import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Station } from 'src/app/models/graphql.models';

@Component({
  selector: 'station-details',
  standalone: true,
  templateUrl: './station-details.html',
  styleUrl: './station-details.scss',
  imports: [CommonModule],
})
export class StationDetails {
  station = input.required<Station>();
}
