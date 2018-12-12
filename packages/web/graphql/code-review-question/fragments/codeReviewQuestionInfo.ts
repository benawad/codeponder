import gql from "graphql-tag";
import { questionReplyInfoFragment } from "../../question-reply/fragments/questionReplyInfo";

export const codeReviewQuestionInfoFragment = gql`
  fragment CodeReviewQuestionInfo on CodeReviewQuestion {
    id
    startingLineNum
    endingLineNum
    text
    path
    repo
    branch
    username
    creatorId
    replies {
      ...QuestionReplyInfo
    }
  }

  ${questionReplyInfoFragment}
`;
