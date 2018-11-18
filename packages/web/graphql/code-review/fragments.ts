import gql from "graphql-tag";

export const CodeReviewInfoFragment = gql`
  fragment CodeReviewInfo on CodeReviewRequest {
    id
    numDays
    codeUrl
    techTags
    notes
  }
`;
