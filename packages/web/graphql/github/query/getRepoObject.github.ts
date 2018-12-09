import gql from "graphql-tag";

export const getRepoObject = gql`
  query GetRepoObject($owner: String!, $name: String!, $expression: String!) {
    repository(owner: $owner, name: $name) {
      object(expression: $expression) {
        __typename
        ... on Blob {
          oid
        }
        ... on Tree {
          entries {
            type
            name
          }
        }
      }
    }
  }
`;
