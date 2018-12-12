import gql from "graphql-tag";

export const questionReplyInfoFragment = gql`
  fragment QuestionReplyInfo on QuestionReply {
    id
    text
    creatorId
  }
`;
