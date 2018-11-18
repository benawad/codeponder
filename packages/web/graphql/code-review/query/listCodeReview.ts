import gql from "graphql-tag";
import { CodeReviewInfoFragment } from "../fragments";

export const listcodeReviewsQuery = gql`
  query ListcodeReviewsQuery {
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
