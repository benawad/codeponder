import gql from "graphql-tag";
import { userInfoFragment } from "../../user/fragments/UserInfo";

export const codeReviewPostInfoFragment = gql`
  fragment CodeReviewPostInfo on CodeReviewPost {
    id
    title
    repo
    commitId
    repoOwner
    topics
    creator {
      ...UserInfo
    }
  }

  ${userInfoFragment}
`;
