import { Injectable } from '@angular/core';
import {
  Observable,
  map,
  BehaviorSubject,
  of,
  tap,
  Subscription,
  expand,
  reduce,
  EMPTY,
} from 'rxjs';
import { Apollo } from 'apollo-angular';
import {
  GET_DETECTIONS,
  GET_NEARBY_STATIONS,
  GET_STATION_BY_ID,
} from '../queries/graphql.queries';
import {
  Station,
  DetectionConnection,
  Detection,
} from '../models/graphql.models';
import { DETECTION_SUBSCRIPTION } from '../queries/graphql.subscriptions';

@Injectable({
  providedIn: 'root',
})
export class BirdDataService {
  private stationsSubject = new BehaviorSubject<Station[]>([]);
  /** An observable of the station list, accessible to any component. */
  readonly stations$ = this.stationsSubject.asObservable();
  private newDetectionsSubject = new BehaviorSubject<Detection[]>([]);
  readonly newDetections$ = this.newDetectionsSubject.asObservable();

  constructor(private apollo: Apollo) {}

  /** Returns the current value of the stations list. */
  getStationsValue(): Station[] {
    return this.stationsSubject.getValue();
  }

  getNearbyStations(
    latitude: number,
    longitude: number,
  ): Observable<Station[]> {
    // Approximate conversion: 1 degree of latitude is about 69 miles.
    // For a 20-mile square, we need to go 10 miles in each cardinal direction.
    const miles = 10; // Half the side length of the square
    const latDegreePerMile = 1 / 69.17; // Approximate miles per degree latitude
    const latDelta = miles * latDegreePerMile;

    // Longitude degrees per mile varies with latitude (cos(latitude) factor)
    const lonDegreePerMile = (lat: number) =>
      miles / (69.17 * Math.cos((lat * Math.PI) / 180));
    const lonDelta = lonDegreePerMile(latitude);

    const ne = { lat: latitude + latDelta, lon: longitude + lonDelta };
    const sw = { lat: latitude - latDelta, lon: longitude - lonDelta };

    console.log(
      'Getting Stations with bounds: ' +
        JSON.stringify(ne) +
        ', ' +
        JSON.stringify(sw),
    );

    return this.apollo
      .watchQuery<{ stations: { nodes: Station[] } }>({
        query: GET_NEARBY_STATIONS,
        variables: {
          ne: ne,
          sw: sw,
        },
      })
      .valueChanges.pipe(
        map((result) => result.data?.stations?.nodes ?? []),
        tap((stations) => this.stationsSubject.next(stations)), // Update the subject with new data
      );
  }

  getStationById(id: number): Observable<Station | undefined> {
    console.log('Getting Station by ID: ' + id);
    return this.apollo
      .watchQuery<{ station: Station }>({
        query: GET_STATION_BY_ID,
        variables: {
          id: id,
        },
      })
      .valueChanges.pipe(map((result) => result.data?.station));
  }

  getDetectionsForStations(
    stationIds: number[],
    pageSize: number = 50,
  ): Observable<Detection[]> {
    console.log(
      `Getting all detections for Stations: ${stationIds.join(', ')} with page size ${pageSize}`,
    );

    // GraphQL expects station IDs as strings.
    const stationIdStrings = stationIds.map((id) => id.toString());

    // Helper function to fetch a single page of data
    const fetchPage = (
      cursor?: string,
    ): Observable<{ data: { detections: DetectionConnection } }> => {
      const variables: { stationIds: string[]; last: number; after?: string } =
        {
          stationIds: stationIdStrings,
          last: pageSize,
        };
      if (cursor) {
        variables.after = cursor;
      }
      return this.apollo.query<{ detections: DetectionConnection }>({
        query: GET_DETECTIONS,
        variables: variables,
        fetchPolicy: 'network-only',
      });
    };

    // Use `expand` to recursively fetch pages until there are no more.
    return fetchPage().pipe(
      expand((response) => {
        const pageInfo = response.data?.detections?.pageInfo;
        if (pageInfo?.hasNextPage && pageInfo.endCursor) {
          return fetchPage(pageInfo.endCursor);
        } else {
          return EMPTY; // Completes the expand operator when done
        }
      }),
      // Use `reduce` to accumulate all nodes from all pages into a single array
      reduce((acc: Detection[], response) => {
        const newNodes =
          response.data?.detections?.nodes?.filter(
            (d): d is Detection => d !== null,
          ) ?? [];
        return [...acc, ...newNodes];
      }, []),
      tap((allDetections) =>
        console.log(
          `Finished fetching all pages. Total detections found: ${allDetections.length}`,
        ),
      ),
    );
  }

  subscribeToNewDetections(stationId: number): Subscription {
    return this.apollo
      .subscribe<{ newDetection: { detection: Detection } }>({
        query: DETECTION_SUBSCRIPTION,
        variables: { stationIds: [stationId] },
      })
      .pipe(map((result) => result.data?.newDetection?.detection))
      .subscribe((detection) => {
        if (detection) {
          this.newDetectionsSubject.next([detection]);
        }
      });
  }
}
