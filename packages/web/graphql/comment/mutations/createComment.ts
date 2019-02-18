import gql from "graphql-tag";
import { commentInfoFragment } from "../fragments/commentInfo";

export const createCommentMutation = gql`
  mutation CreateComment($comment: CreateCommentInput!) {
    createComment(comment: $comment) {
      comment {
        ...CommentInfo
      }
    }
  }

  ${commentInfoFragment}
`;
