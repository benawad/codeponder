import gql from "graphql-tag";

export const createCodeReviewRequestMutation = gql`
  mutation CreateCodeReviewRequestMutation(
    $input: CreateCodeReviewRequestInput!
  ) {
    createCodeReviewRequest(input: $input) {
      codeReviewRequest {
        id
        numDays
        codeUrl
        techTags
        notes
      }
      errors {
        path
        message
      }
    }
  }
`;
