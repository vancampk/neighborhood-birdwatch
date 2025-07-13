import { gql } from 'apollo-angular';

export const GET_DETECTIONS_FOR_STATION = gql`
  query detections($last: Int, $stationIds: [ID!]) {
    detections(last : $last, stationIds: $stationIds) {  
      edges {
        cursor
        node {
          id
        }
      }
      pageInfo{
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      speciesCount
      totalCount  
      nodes {
          id
          probability
          confidence
          timestamp
          score
          favoriteUrl
          soundscape {
            url
            duration
            downloadFilename
          }
          species {
            color
            commonName
            scientificName
            imageUrl
            mlUrl
            wikipediaSummary 
            wikipediaUrl 
            range
            ebirdUrl          
          }
        }
    }
  }
`;

export interface Detections{
  edges: DetectionEdge;
  pageInfo: PageInfo;
  speciesCount: number;
  totalCount: number;
  nodes: BirdDetection[];
}

interface DetectionEdge{
  cursor: string;
  node: BirdDetection;
}


interface PageInfo{
  endCursor: string;
  hasNextPage: boolean;
}


interface PageInfo{
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
}


export interface BirdDetection {
    id: string;
    probability: number;
    score: number;
    species: Species;
    timestamp: Date;
    confidence: number;
    favoriteUrl: string;
    soundscape: SoundScape;
}

export interface Species {
    color: string;
    commonName: string;
    scientificName: string;
    imageUrl: string;
    mlUrl: string;
    wikipediaSummary: string;
    wikipediaUrl: string;
    range: string;
    ebirdUrl: string;
}

interface SoundScape{
    url: string;
    duration: number;
    downloadFilename: string;
}

interface InputDuration{
  from: Date;
  to: Date;
  unit: string;
  count: number;
}