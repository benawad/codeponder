import gql from "graphql-tag";

export const getViewerRepos = gql`
  query GetViewerRepos {
    viewer {
      repositories(first: 100) {
        totalCount
        edges {
          node {
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
        }
      }
    }
  }
`;
