import gql from "graphql-tag";

export const CodeReviewRequestInfoFragment = gql`
  fragment CodeReviewRequestInfo on CodeReviewRequest {
    id
    numDays
    codeUrl
    techTags
    notes
  }
`;
