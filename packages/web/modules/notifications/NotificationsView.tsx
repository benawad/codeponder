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
} from "../../generated/apollo-components";
import { findPostQuery } from "../../graphql/post/queries/findPost";
import { notificationsQuery } from "../../graphql/question-comment-notification/queries/notifications";
import { Link } from "../../server/routes";
import { Layout } from "../shared/Layout";

export const NotificationsView: React.FC = () => {
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
                                cache.writeQuery<
                                  NotificationsQuery,
                                  NotificationsVariables
                                >({
                                  query: notificationsQuery,
                                  data: {
                                    notifications: {
                                      hasMore: data.notifications.hasMore,
                                      notifications: orderBy(
                                        data.notifications.notifications.map(
                                          x =>
                                            x.comment.id === n.comment.id &&
                                            x.question.id === n.question.id
                                              ? { ...n, read: !n.read }
                                              : x
                                        ),
                                        ["read", "createdAt"],
                                        ["asc", "desc"]
                                      ),
                                    },
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
                                path: n.question.path!,
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
                              await fetchMore({
                                query: findPostQuery,
                                variables: {
                                  cursor: data.notifications.notifications[
                                    data.notifications.notifications.length - 1
                                  ]!.createdAt,
                                },
                                updateQuery: (
                                  previous,
                                  { fetchMoreResult }
                                ) => {
                                  if (!fetchMoreResult) {
                                    return previous;
                                  }

                                  return {
                                    ...previous,
                                    notifications: {
                                      ...previous.notifications,
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
