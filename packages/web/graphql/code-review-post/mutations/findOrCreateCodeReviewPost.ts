import gql from "graphql-tag";
import { codeReviewPostInfoFragment } from "../fragments/codeReviewPostInfo";

export const findOrCreateCodeReviewPost = gql`
  mutation FindOrCreateCodeReviewPost(
    $codeReviewPost: CreateCodeReviewPostInput!
  ) {
    findOrCreateCodeReviewPost(codeReviewPost: $codeReviewPost) {
      codeReviewPost {
        ...CodeReviewPostInfo
      }
    }
  }

  ${codeReviewPostInfoFragment}
`;
