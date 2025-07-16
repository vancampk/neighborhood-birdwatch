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