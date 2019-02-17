import { NotificationRow, SidebarCard, Spinner } from "@codeponder/ui";
import * as React from "react";
import {
  NotificationsComponent,
  NotificationsQuery,
  NotificationsVariables,
  UpdateNotificationReadComponent,
} from "../../generated/apollo-components";
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
                {({ data, loading }) => {
                  if (!data || loading) {
                    return <Spinner />;
                  }

                  if (!data.notifications.length) {
                    return <div>no notifications</div>;
                  }

                  return data.notifications.map(n => (
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
                                notifications: data.notifications.map(x =>
                                  x.comment.id === n.comment.id &&
                                  x.question.id === n.question.id
                                    ? { ...n, read: !n.read }
                                    : x
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
                  ));
                }}
              </NotificationsComponent>
            )}
          </UpdateNotificationReadComponent>
        </SidebarCard>
      </div>
    </Layout>
  );
};
