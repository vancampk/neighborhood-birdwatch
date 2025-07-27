import { Injectable, signal } from '@angular/core';

/**
 * signal used to alert on api failure that something is wrong and the map can't be loaded
 * This can be due to service issues or api monthly limits being reached
 */
@Injectable({
  providedIn: 'root',
})
export class MapStatusService {
  public isApiLimitReached = signal(false);
}
