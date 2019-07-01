import {
  MyButton,
  NotificationRow,
  SidebarCard,
  Spinner,
} from "@codeponder/ui";
import { orderBy } from "lodash";
import * as React from "react";
import { Box } from "rebass";
import {
  NotificationsComponent,
  NotificationsQuery,
  NotificationsVariables,
  UpdateNotificationReadComponent,
  MeMe,
} from "../../generated/apollo-components";
import { findPostQuery } from "../../graphql/post/queries/findPost";
import { notificationsQuery } from "../../graphql/question-comment-notification/queries/notifications";
import { Link } from "../../server/routes";
import { Layout } from "../shared/Layout";
import gql from "graphql-tag";

export const NotificationsView: React.FC<{ me: MeMe }> = ({
  me,
}): JSX.Element => {
  return (
    <Layout title="Notifications">
      <div style={{ display: "flex", flex: 1, marginBottom: "2rem" }}>
        <SidebarCard style={{ flex: 1 }}>
          <UpdateNotificationReadComponent>
            {updateNotificationRead => (
              <NotificationsComponent fetchPolicy="network-only">
                {({ data, loading, fetchMore }) => {
                  if (!data || loading) {
                    return <Spinner />;
                  }

                  if (!data.notifications.notifications.length) {
                    return <div>no notifications</div>;
                  }

                  return (
                    <>
                      {data.notifications.notifications.map(n => (
                        <NotificationRow
                          onMarkAsClick={() =>
                            updateNotificationRead({
                              variables: {
                                commentId: n.comment.id,
                                questionId: n.question.id,
                                read: !n.read,
                              },
                              update: cache => {
                                const notifications = data.notifications.notifications.map(
                                  x =>
                                    x.comment.id === n.comment.id &&
                                    x.question.id === n.question.id
                                      ? { ...n, read: !n.read }
                                      : x
                                );

                                cache.writeQuery<
                                  NotificationsQuery,
                                  NotificationsVariables
                                >({
                                  query: notificationsQuery,
                                  data: {
                                    notifications: {
                                      __typename: "NotificationsResponse",
                                      hasMore: data.notifications.hasMore,
                                      notifications: orderBy(
                                        notifications,
                                        ["read", "createdAt"],
                                        ["asc", "desc"]
                                      ),
                                    },
                                  },
                                });

                                cache.writeFragment({
                                  id: `User:${me.id}`,
                                  fragment: gql`
                                    fragment test on User {
                                      hasUnreadNotifications
                                    }
                                  `,
                                  data: {
                                    __typename: "User",
                                    hasUnreadNotifications: notifications.some(
                                      noti => !noti.read
                                    ),
                                  },
                                });
                              },
                            })
                          }
                          key={n.comment.id + n.question.id}
                          renderQuestionLink={body => (
                            <Link
                              route="post"
                              params={{
                                id: n.question.post.id,
                                path: n.question.path || "",
                                questionId: n.question.id,
                              }}
                            >
                              <a>{body}</a>
                            </Link>
                          )}
                          renderRepoLink={body => (
                            <Link
                              route="post"
                              params={{
                                id: n.question.post.id,
                              }}
                            >
                              <a>{body}</a>
                            </Link>
                          )}
                          {...n}
                        />
                      ))}
                      {data.notifications.hasMore ? (
                        <Box my="1.6rem" ml="1.6rem">
                          <MyButton
                            variant="primary"
                            onClick={async () => {
                              const notification =
                                data.notifications.notifications[
                                  data.notifications.notifications.length - 1
                                ];
                              await fetchMore({
                                query: findPostQuery,
                                variables: {
                                  cursor:
                                    notification && notification.createdAt,
                                },
                                updateQuery: (
                                  previous,
                                  { fetchMoreResult }
                                ) => {
                                  if (!fetchMoreResult) {
                                    return previous;
                                  }

                                  return {
                                    notifications: {
                                      __typename: "NotificationsResponse",
                                      hasMore:
                                        fetchMoreResult.notifications.hasMore,
                                      notifications: [
                                        ...previous.notifications.notifications,
                                        ...fetchMoreResult.notifications
                                          .notifications,
                                      ],
                                    },
                                  };
                                },
                              });
                            }}
                          >
                            load more
                          </MyButton>
                        </Box>
                      ) : null}
                    </>
                  );
                }}
              </NotificationsComponent>
            )}
          </UpdateNotificationReadComponent>
        </SidebarCard>
      </div>
    </Layout>
  );
};
