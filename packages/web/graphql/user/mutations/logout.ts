import gql from "graphql-tag";

export const logoutMutation = gql`
  mutation Logout {
    logout
  }
`;
