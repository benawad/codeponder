import gql from "graphql-tag";
import { questionInfoFragment } from "../fragments/QuestionInfo";

export const createQuestionMutation = gql`
  mutation CreateQuestion($question: CreateQuestionInput!) {
    createQuestion(question: $question) {
      question {
        ...QuestionInfo
      }
    }
  }

  ${questionInfoFragment}
`;
