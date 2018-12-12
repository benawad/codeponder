import gql from "graphql-tag";
import { codeReviewQuestionInfoFragment } from "../fragments/codeReviewQuestionInfo";

export const findCodeReviewQuestionsQuery = gql`
  query FindCodeReviewQuestions(
    $username: String!
    $branch: String!
    $repo: String!
    $path: String
  ) {
    findCodeReviewQuestions(
      username: $username
      branch: $branch
      repo: $repo
      path: $path
    ) {
      ...CodeReviewQuestionInfo
    }
  }

  ${codeReviewQuestionInfoFragment}
`;
