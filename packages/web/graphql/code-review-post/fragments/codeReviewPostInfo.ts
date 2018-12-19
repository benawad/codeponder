import gql from "graphql-tag";

export const codeReviewPostInfoFragment = gql`
  fragment CodeReviewPostInfo on CodeReviewPost {
    id
    programmingLanguages
    repo
    commitId
    repoOwner
    topics
  }
`;
