import gql from "graphql-tag";
import { CodeReviewRequestInfoFragment } from "../fragments";

export const listCodeReviewRequestsQuery = gql`
  query ListCodeReviewRequestsQuery {
    listCodeReviewRequests {
      ...CodeReviewRequestInfo
    }
  }
  ${CodeReviewRequestInfoFragment}
`;
