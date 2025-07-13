import { gql } from 'apollo-angular';
import { Detections, Species } from '../models/station-detection.model';


export const GET_NEARBY_STATIONS = gql`
 query stations($ne: InputLocation, $sw: InputLocation) {
    stations(ne: $ne, sw: $sw) {
      nodes {
        id
        name     
        location
        airPollution{
          aqi
          co
        }        
        coords {
          lat
          lon
        }
      }
    }
  }
`;

export const GET_STATION_BY_ID = gql`
   query Station ($id: ID!) {
    station(id: $id) {
        name
        location
        type
        audioUrl
        videoUrl
        
        coords {
            lat
            lon
        }        
        detections {
            speciesCount
            totalCount           
            nodes {               
                id               
                speciesId
                timestamp
            }
        }
        topSpecies {
          averageProbability
          count
          speciesId
          species {            
            commonName
          }
        }      
    }
}`;



export interface Station {
  id: number;
  name: string;
  location: string;
  audioUrl: string;
  videoUrl: string;
  notes: string;
  source: string;
  type: string;
  lat: number;
  lon: number;
  coords: Coordinates
  airPollution: AirPollution;
  earliestDetectionAt: Date;
  detections: Detections;
  weather: WeatherReading;
  topSpecies: TopSpecies[];
}

export interface AirPollution {
  aqi: number;
  co: number;
  o3: number;
  no2: number;
  so2: number;
  pm2_5: number;
}

export interface WeatherReading{
  description: string;
  temp: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDir: string;
  windDirDegrees: number;
  rain: number;
  cloudCover: number;
}

export interface TopSpecies {
  averageProbability: number;
  count: number;
  speciesId: number;
  species: Species;
}

export interface Counts {
  detections: number;
  species: number;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

