import gql from "graphql-tag";

export const meQuery = gql`
  query MeQuery {
    me {
      id
      email
      username
    }
  }
`;
