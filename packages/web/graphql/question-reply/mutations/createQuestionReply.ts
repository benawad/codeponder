import gql from "graphql-tag";

export const createQuestionReplyMutation = gql`
  mutation CreateQuestionReply($questionReply: CreateQuestionReplyInput!) {
    createQuestionReply(questionReply: $questionReply) {
      questionReply {
        id
        reply
        creatorId
      }
    }
  }
`;
