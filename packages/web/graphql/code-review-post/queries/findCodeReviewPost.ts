import gql from "graphql-tag";
import { codeReviewPostInfoFragment } from "../fragments/codeReviewPostInfo";

export const findCodeReviewPost = gql`
  query findCodeReviewPost($input: FindCodeReviewPostInput!) {
    findCodeReviewPost(input: $input) {
      ...CodeReviewPostInfo
    }
  }

  ${codeReviewPostInfoFragment}
`;
