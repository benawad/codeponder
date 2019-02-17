import gql from "graphql-tag";
import { userInfoFragment } from "../fragments/UserInfo";

export const meQuery = gql`
  query Me {
    me {
      hasUnreadNotifications
      ...UserInfo
    }
  }

  ${userInfoFragment}
`;
