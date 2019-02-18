import gql from "graphql-tag";
import { userInfoFragment } from "../../user/fragments/UserInfo";

export const commentInfoFragment = gql`
  fragment CommentInfo on Comment {
    id
    text
    createdAt
    creator {
      ...UserInfo
    }
  }

  ${userInfoFragment}
`;
