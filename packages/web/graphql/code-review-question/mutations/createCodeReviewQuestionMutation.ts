import gql from "graphql-tag";
import { codeReviewQuestionInfoFragment } from "../fragments/codeReviewQuestionInfo";

export const createCodeReviewQuestionMutation = gql`
  mutation CreateCodeReviewQuestion(
    $codeReviewQuestion: CreateCodeReviewQuestionInput!
  ) {
    createCodeReviewQuestion(codeReviewQuestion: $codeReviewQuestion) {
      codeReviewQuestion {
        ...CodeReviewQuestionInfo
      }
    }
  }

  ${codeReviewQuestionInfoFragment}
`;
