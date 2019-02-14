import gql from "graphql-tag";
import { commentInfoFragment } from "../../comment/fragments/commentInfo";
import { userInfoFragment } from "../../user/fragments/UserInfo";
export const questionInfoFragment = gql`
  fragment QuestionInfo on Question {
    id
    lineNum
    title
    text
    programmingLanguage
    codeSnippet
    numComments
    createdAt
    path
    postId
    creator {
      ...UserInfo
    }
    comments {
      ...CommentInfo
    }
  }

  ${userInfoFragment}
  ${commentInfoFragment}
`;
