import gql from "graphql-tag";
import { codeReviewPostInfoFragment } from "../fragments/codeReviewPostInfo";

export const findCodeReviewPostQuery = gql`
  query findCodeReviewPost($input: FindCodeReviewPostInput!) {
    findCodeReviewPost(input: $input) {
      hasMore
      posts {
        ...CodeReviewPostInfo
      }
    }
  }

  ${codeReviewPostInfoFragment}
`;
