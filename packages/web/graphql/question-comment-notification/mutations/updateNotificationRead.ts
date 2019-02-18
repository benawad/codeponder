import { gql } from "apollo-boost";

export const updateNotificationReadMutation = gql`
  mutation UpdateNotificationRead(
    $read: Boolean!
    $questionId: String!
    $commentId: String!
  ) {
    updateNotificationRead(
      read: $read
      questionId: $questionId
      commentId: $commentId
    ) {
      ok
    }
  }
`;
