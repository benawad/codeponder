import gql from "graphql-tag";
import { postInfoFragment } from "../fragments/postInfo";

export const findPostQuery = gql`
  query findPost($input: FindPostInput!) {
    findPost(input: $input) {
      hasMore
      posts {
        ...PostInfo
      }
    }
  }

  ${postInfoFragment}
`;
