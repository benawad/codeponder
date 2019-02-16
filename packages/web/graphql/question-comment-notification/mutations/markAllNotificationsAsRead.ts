import { gql } from "apollo-boost";

export const markAllNotificationsAsReadMutation = gql`
  mutation MarkAllNotificationsAsRead {
    markAllNotificationsAsRead {
      ok
    }
  }
`;
