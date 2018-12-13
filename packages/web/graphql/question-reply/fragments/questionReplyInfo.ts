import gql from "graphql-tag";
import { userInfoFragment } from "../../user/fragments/UserInfo";

export const questionReplyInfoFragment = gql`
  fragment QuestionReplyInfo on QuestionReply {
    id
    text
    creator {
      ...UserInfo
    }
  }

  ${userInfoFragment}
`;
