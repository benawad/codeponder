import gql from "graphql-tag";
import { CodeReviewInfoFragment } from "../fragments";

export const createCodeReviewMutation = gql`
  mutation CreateCodeReviewMutation($input: CreateCodeReviewInput!) {
    createCodeReview(input: $input) {
      codeReview {
        ...CodeReviewInfo
      }
      errors {
        path
        message
      }
    }
  }

  ${CodeReviewInfoFragment}
`;
