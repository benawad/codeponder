import * as React from "react";
import { Link, Text, Flex } from "rebass";
import NextLink from "next/link";
import get from "lodash.get";
import { MyButton, Avatar, GitHubButton } from "@codeponder/ui";
import Router from "next/router";
import styled from "styled-components";
import { Menu, Dropdown } from "antd";

import { MeComponent, LogoutComponent } from "./apollo-components";

const Container = styled(Flex)`
  flex: 0 0 auto;
`;

export const NavBar = () => {
  return (
    <Container my="1.5rem" justifyContent="space-between">
      <Flex alignItems="center">
        <NextLink passHref href="/">
          <Link fontSize={5} color="primary.1">
            <Text fontFamily="rubik">Code Ponder 🤔</Text>
          </Link>
        </NextLink>
      </Flex>

      <MeComponent>
        {({ data, loading }) => {
          if (loading) {
            return null;
          }

          let isLoggedIn = !!get(data, "me", false);

          if (isLoggedIn) {
            return (
              <Flex>
                <MyButton
                  variant="primary"
                  onClick={() => Router.push("/pick-repo")}
                >
                  NEW CODE REVIEW
                </MyButton>
                <LogoutComponent>
                  {(mutate, { client }) => (
                    <Dropdown
                      placement="bottomRight"
                      overlay={
                        <Menu>
                          <Menu.Item
                            onClick={async () => {
                              await mutate();
                              await client.resetStore();
                            }}
                          >
                            logout
                          </Menu.Item>
                        </Menu>
                      }
                    >
                      <Avatar
                        size={32}
                        src={data!.me!.pictureUrl}
                        alt="avatar"
                      />
                    </Dropdown>
                  )}
                </LogoutComponent>
              </Flex>
            );
          }

          return (
            <a href="http://localhost:4000/auth/github">
              <GitHubButton>Sign in with GitHub</GitHubButton>
            </a>
          );
        }}
      </MeComponent>
    </Container>
  );
};
