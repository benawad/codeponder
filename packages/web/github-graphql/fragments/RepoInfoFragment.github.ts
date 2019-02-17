import { gql } from "apollo-boost";

export const repoInfoFragment = gql`
  fragment RepoInfo on Repository {
    name
    description
    owner {
      login
    }
    defaultBranchRef {
      name
      target {
        __typename
        oid
      }
    }
    languages(first: 10) {
      edges {
        node {
          name
          color
        }
        size
      }
    }
    repositoryTopics(first: 10) {
      edges {
        node {
          topic {
            name
          }
        }
      }
    }
  }
`;
