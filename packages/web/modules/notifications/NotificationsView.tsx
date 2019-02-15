import { SidebarCard, Spinner } from "@codeponder/ui";
import * as React from "react";
import { NotificationsComponent } from "../../generated/apollo-components";
import { Layout } from "../shared/Layout";

export const NotificationsView: React.FC = () => {
  return (
    <Layout title="Notifications">
      <SidebarCard
        style={{
          flex: 1,
          marginBottom: "2rem",
        }}
      >
        <NotificationsComponent variables={{ read: false }}>
          {({ data, loading }) => {
            if (!data || loading) {
              return <Spinner />;
            }

            if (!data.notifications.length) {
              return <div>no notifications</div>;
            }

            return null;
          }}
        </NotificationsComponent>
      </SidebarCard>
    </Layout>
  );
};
