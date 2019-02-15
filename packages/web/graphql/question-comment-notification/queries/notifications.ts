import gql from "graphql-tag";

export const notificationsQuery = gql`
  query Notifications($read: Boolean!) {
    notifications(read: $read) {
      comment {
        id
        text
        creator {
          username
        }
      }
      question {
        title
        numComments
        post {
          title
        }
      }
    }
  }
`;
