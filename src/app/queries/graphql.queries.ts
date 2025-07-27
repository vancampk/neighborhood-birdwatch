import { gql } from 'apollo-angular';

export const GET_DETECTIONS = gql`
  query detections($last: Int, $stationIds: [ID!], $after: String) {
    detections(last: $last, stationIds: $stationIds, period: { count: 24, unit: "hour" }, after: $after) {
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
        certainty
        confidence
        eclipse
        favoriteUrl
        flagUrl
        mode
        probability
        score
        speciesId
        timestamp
        voteUrl
        soundscape {
          url
          duration
        }
        station {
          id
          name
        }
        species {
          id
          birdweatherUrl
          color
          commonName
          ebirdCode
          ebirdUrl          
          imageUrl
          mlUrl
          scientificName
          thumbnailUrl
          wikipediaSummary
          wikipediaUrl
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
        id
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