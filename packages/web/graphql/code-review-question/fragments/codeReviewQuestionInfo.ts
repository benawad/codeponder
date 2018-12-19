import gql from "graphql-tag";
import { questionReplyInfoFragment } from "../../question-reply/fragments/questionReplyInfo";
import { userInfoFragment } from "../../user/fragments/UserInfo";

export const codeReviewQuestionInfoFragment = gql`
  fragment CodeReviewQuestionInfo on CodeReviewQuestion {
    id
    startingLineNum
    endingLineNum
    text
    programmingLanguage
    creator {
      ...UserInfo
    }
    replies {
      ...QuestionReplyInfo
    }
  }

  ${userInfoFragment}
  ${questionReplyInfoFragment}
`;
