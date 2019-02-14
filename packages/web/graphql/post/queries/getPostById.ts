import gql from "graphql-tag";
import { postInfoFragment } from "../fragments/postInfo";

export const getPostByIdQuery = gql`
  query GetPostById($id: String!) {
    getPostById(id: $id) {
      ...PostInfo
    }
  }

  ${postInfoFragment}
`;
