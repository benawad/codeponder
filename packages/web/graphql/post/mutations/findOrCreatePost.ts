import gql from "graphql-tag";
import { postInfoFragment } from "../fragments/postInfo";

export const findOrCreatePost = gql`
  mutation FindOrCreatePost($post: CreatePostInput!) {
    findOrCreatePost(post: $post) {
      post {
        ...PostInfo
      }
    }
  }

  ${postInfoFragment}
`;
