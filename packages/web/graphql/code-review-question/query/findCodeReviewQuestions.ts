import gql from "graphql-tag";
import { codeReviewQuestionInfoFragment } from "../fragments/codeReviewQuestionInfo";

export const findCodeReviewQuestionsQuery = gql`
  query FindCodeReviewQuestions($postId: String!, $path: String) {
    findCodeReviewQuestions(postId: $postId, path: $path) {
      ...CodeReviewQuestionInfo
    }
  }

  ${codeReviewQuestionInfoFragment}
`;
