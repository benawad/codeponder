import gql from "graphql-tag";
import { userInfoFragment } from "../../user/fragments/UserInfo";

export const notificationsQuery = gql`
  query Notifications($cursor: String) {
    notifications(cursor: $cursor) {
      hasMore
      notifications {
        __typename
        id
        type
        createdAt
        read
        comment {
          id
          creator {
            ...UserInfo
          }
        }
        question {
          id
          title
          path
          post {
            id
            repo
            creator {
              ...UserInfo
            }
          }
        }
      }
    }
  }

  ${userInfoFragment}
`;
