import gql from "graphql-tag";
import { CodeReviewInfoFragment } from "../fragments";
import { UserInfoFragment } from "../../user/fragment";

export const listCodeReviewsQuery = gql`
  query ListCodeReviewsQuery {
    listCodeReviews {
      ...CodeReviewInfo
      owner {
        ...UserInfo
      }
    }
  }
  ${CodeReviewInfoFragment}
  ${UserInfoFragment}
`;
