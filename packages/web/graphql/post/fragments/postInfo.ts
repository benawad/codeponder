import gql from "graphql-tag";
import { userInfoFragment } from "../../user/fragments/UserInfo";

export const postInfoFragment = gql`
  fragment PostInfo on Post {
    id
    title
    repo
    commitId
    repoOwner
    topics
    numQuestions
    createdAt
    creator {
      ...UserInfo
    }
  }

  ${userInfoFragment}
`;
