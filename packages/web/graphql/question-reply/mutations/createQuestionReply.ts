import gql from "graphql-tag";
import { questionReplyInfoFragment } from "../fragments/questionReplyInfo";

export const createQuestionReplyMutation = gql`
  mutation CreateQuestionReply($questionReply: CreateQuestionReplyInput!) {
    createQuestionReply(questionReply: $questionReply) {
      questionReply {
        ...QuestionReplyInfo
      }
    }
  }

  ${questionReplyInfoFragment}
`;
