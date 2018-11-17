import gql from "graphql-tag";

export const loginMutation = gql`
  mutation LoginMutation($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        username
        email
      }
      errors {
        path
        message
      }
    }
  }
`;
