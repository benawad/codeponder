import gql from "graphql-tag";
import { UserInfoFragment } from "../fragment";

export const meQuery = gql`
  query MeQuery {
    me {
      ...UserInfo
    }
  }

  ${UserInfoFragment}
`;
