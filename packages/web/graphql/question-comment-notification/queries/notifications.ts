import gql from "graphql-tag";

export const notificationsQuery = gql`
  query Notifications($cursor: String) {
    notifications(cursor: $cursor) {
      hasMore
      notifications {
        type
        createdAt
        read
        comment {
          id
          creator {
            username
            pictureUrl
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
              username
            }
          }
        }
      }
    }
  }
`;
