import { Component, computed, inject, input } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Station } from 'src/app/models/graphql.models';
import { environment } from '../../../environments/environment';
import { LocationService } from 'src/app/services/location-data.service';
import { MapStatusService } from 'src/app/services/map-status.service';

@Component({
  selector: 'station-details',
  standalone: true,
  templateUrl: './station-details.html',
  styleUrl: './station-details.scss',
  imports: [CommonModule, DecimalPipe],
})
export class StationDetails {
  station = input.required<Station>();
  private locationService = inject(LocationService);
  public mapStatusService = inject(MapStatusService);

  public StationDetails(locationService: LocationService){
    this.locationService = locationService;
  }

  public distance = computed(() => {
    const stationCoords = this.station()?.coords;
    const userCoords = this.locationService.userCoords();
    if (!stationCoords || !userCoords) {
      return null;
    }
    return this.locationService.distanceInMilesBetweenEarthCoordinates(stationCoords.lat, stationCoords.lon).toFixed(2);
  });


  public dmsCoords = computed<{ lat: string; lon: string } | null>(() => {
    const coords = this.station()?.coords;
    if (!coords) {
      return null;
    }
    return this.locationService.convertCoordsToDMS(coords.lat, coords.lon);
  });


  public mapboxMapUrl = computed<string | null>(() => {
    if (this.mapStatusService.isApiLimitReached()) {
      return null;
    }

    const stationCoords = this.station()?.coords;
    const userCoords = this.locationService.userCoords();
    const apiKey = environment.mapboxAccessToken;

    if (!stationCoords || !apiKey) {
      return null;
    }

    const { lat: stationLat, lon: stationLon } = stationCoords;

    // Define the station pin (red) and map style
    const stationPin = `pin-s+ff0000(${stationLon},${stationLat})`;
    const mapStyle = 'mapbox/satellite-streets-v12';

    let overlays: string;
    let position: string;
    let queryParams = `access_token=${apiKey}`;

    if (userCoords) {
      // When we have the user's location, show both pins and auto-fit the map.
      const userPin = `pin-s+0000ff(${userCoords.longitude},${userCoords.latitude})`;
      overlays = [stationPin, userPin].join(',');
      position = 'auto';
      const padding = 50;
      queryParams += `&padding=${padding}`;
    } else {
      // When we only have the station, center on it with a fixed, zoomed-out level.
      overlays = stationPin;
      const zoom = 12;
      position = `${stationLon},${stationLat},${zoom}`;
    }

    return `https://api.mapbox.com/styles/v1/${mapStyle}/static/${overlays}/${position}/600x400?${queryParams}`;
  });

  handleMapError(): void {
    this.mapStatusService.isApiLimitReached.set(true);
  }
}
