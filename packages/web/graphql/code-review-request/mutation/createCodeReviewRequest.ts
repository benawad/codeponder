import gql from "graphql-tag";
import { CodeReviewRequestInfoFragment } from "../fragments";

export const createCodeReviewRequestMutation = gql`
  mutation CreateCodeReviewRequestMutation(
    $input: CreateCodeReviewRequestInput!
  ) {
    createCodeReviewRequest(input: $input) {
      codeReviewRequest {
        ...CodeReviewRequestInfo
      }
      errors {
        path
        message
      }
    }
  }

  ${CodeReviewRequestInfoFragment}
`;
