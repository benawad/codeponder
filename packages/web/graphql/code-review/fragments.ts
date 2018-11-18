import gql from "graphql-tag";

export const CodeReviewInfoFragment = gql`
  fragment CodeReviewInfo on CodeReview {
    id
    numDays
    codeUrl
    techTags
    notes
  }
`;
