import gql from "graphql-tag";
import { CodeReviewInfoFragment } from "../fragments";

export const listCodeReviewsQuery = gql`
  query ListCodeReviewsQuery {
    listcodeReviews {
      ...CodeReviewInfo
      owner {
        id
        username
      }
    }
  }
  ${CodeReviewInfoFragment}
`;
