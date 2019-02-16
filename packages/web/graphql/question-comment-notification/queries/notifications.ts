import gql from "graphql-tag";

export const notificationsQuery = gql`
  query Notifications($read: Boolean!) {
    notifications(read: $read) {
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
`;
