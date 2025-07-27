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
          station {
            id
            name
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

export const GET_LAST_DETEACTION_FOR_STATION = gql`
  query detections($stationIds: [ID!]) {
    detections(stationIds: $stationIds, last:5) {
        speciesCount
        totalCount       
        nodes {
            certainty
            confidence
            eclipse
            favoriteUrl
            flagUrl
            id
            mode
            probability
            score
            speciesId
            timestamp
            voteUrl
            species {
                alpha
                alpha6
                birdweatherUrl
                color
                commonName
                ebirdCode
                ebirdUrl
                id
                imageCredit
                imageLicense
                imageLicenseUrl
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