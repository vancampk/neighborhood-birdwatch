import { gql } from '@apollo/client/core';

export const DETECTION_SUBSCRIPTION = gql`
  subscription NewDetection($stationIds: [ID!]) {
    newDetection(stationIds: $stationIds) {
      detection {
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
          predictionArea
          range
          scientificName
          thumbnailUrl
          wikipediaSummary
          wikipediaUrl
        }
      }
    }
  }
`;
