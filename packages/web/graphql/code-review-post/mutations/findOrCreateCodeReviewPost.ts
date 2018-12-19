import gql from "graphql-tag";

export const findOrCreateCodeReviewPost = gql`
  mutation FindOrCreateCodeReviewPost(
    $codeReviewPost: CreateCodeReviewPostInput!
  ) {
    findOrCreateCodeReviewPost(codeReviewPost: $codeReviewPost) {
      codeReviewPost {
        id
        programmingLanguages
        repo
        commitId
        repoOwner
      }
    }
  }
`;
