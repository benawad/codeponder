import gql from "graphql-tag";
import { questionInfoFragment } from "../fragments/questionInfo";

export const findQuestionsQuery = gql`
  query FindQuestions($postId: String!, $path: String) {
    findQuestions(postId: $postId, path: $path) {
      ...QuestionInfo
    }
  }

  ${questionInfoFragment}
`;
