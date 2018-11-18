import * as React from "react";
import Head from "next/head";
import { Container, Menu } from "semantic-ui-react";
import { Query, Mutation } from "react-apollo";

import { meQuery } from "../graphql/user/query/me";
import { MeQuery, LogoutMutation } from "../lib/schema-types";
import Router from "next/router";
import { logoutMutation } from "../graphql/user/mutation/logout";

type Props = {
  title: string;
  showMenu?: boolean;
};

const Layout: React.SFC<Props> = ({
  children,
  title = "This is the default title",
  showMenu
}) => (
  <Container>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {showMenu && (
      <Mutation<LogoutMutation> mutation={logoutMutation}>
        {mutate => (
          <Query<MeQuery> ssr={false} query={meQuery}>
            {({ data, loading }) => {
              const isLoggedIn = !!data.me;

              if (loading) {
                return <Menu />;
              }

              return (
                <Menu>
                  <Menu.Item onClick={() => Router.push("/home")}>
                    Home
                  </Menu.Item>
                  {isLoggedIn && (
                    <Menu.Item
                      onClick={() => Router.push("/create-code-review")}
                    >
                      Request a Code Review
                    </Menu.Item>
                  )}

                  <Menu.Menu position="right">
                    {isLoggedIn ? (
                      <>
                        <Menu.Item>{data.me.username}</Menu.Item>
                        <Menu.Item onClick={() => Router.push("/view-offers")}>
                          offers
                        </Menu.Item>
                        <Menu.Item
                          onClick={async () => {
                            await mutate({});
                            (window as any).location = "/home";
                            // Router.push("/home");
                            // await client.resetStore();
                          }}
                        >
                          logout
                        </Menu.Item>
                      </>
                    ) : (
                      <>
                        <Menu.Item onClick={() => Router.push("/register")}>
                          register
                        </Menu.Item>
                        <Menu.Item onClick={() => Router.push("/login")}>
                          login
                        </Menu.Item>
                      </>
                    )}
                  </Menu.Menu>
                </Menu>
              );
            }}
          </Query>
        )}
      </Mutation>
    )}
    {children}
  </Container>
);

export default Layout;
