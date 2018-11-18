import gql from "graphql-tag";
import { UserInfoFragment } from "../fragment";

export const loginMutation = gql`
  mutation LoginMutation($input: LoginInput!) {
    login(input: $input) {
      user {
        ...UserInfo
      }
      errors {
        path
        message
      }
    }
  }
  ${UserInfoFragment}
`;
