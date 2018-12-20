import gql from "graphql-tag";

export const codeReviewPostInfoFragment = gql`
  fragment CodeReviewPostInfo on CodeReviewPost {
    id
    repo
    commitId
    repoOwner
    topics
  }
`;
