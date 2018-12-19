import gql from "graphql-tag";
import { codeReviewPostInfoFragment } from "../fragments/codeReviewPostInfo";

export const getCodeReviewPostByIdQuery = gql`
  query GetCodeReviewPostById($id: String!) {
    getCodeReviewPostById(id: $id) {
      ...CodeReviewPostInfo
    }
  }

  ${codeReviewPostInfoFragment}
`;
