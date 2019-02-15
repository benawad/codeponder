import { Avatar, GitHubButton, Icon, Menu } from "@codeponder/ui";
import get from "lodash.get";
import NextLink from "next/link";
import * as React from "react";
import { Flex, Link } from "rebass";
import styled from "styled-components";
import Logo from "../../../../assets/logo/logo2.png";
import { MeComponent } from "../../generated/apollo-components";
import { CreatePostModal } from "./CreatePostModal";

const Container = styled(Flex)`
  flex: 0 0 auto;
`;

export const NavBar = () => {
  return (
    <Container my="1.5rem" justifyContent="space-between">
      <Flex alignItems="center">
        <NextLink passHref href="/">
          <Link fontSize={5} color="primary.1">
            <img
              style={{
                width: 300,
              }}
              src={Logo}
            />
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
              <Flex alignItems="center">
                <CreatePostModal />
                <NextLink href="/notifications">
                  <a>
                    <Icon
                      name={
                        data!.me!.hasNotifications
                          ? "activeNotificationBell"
                          : "emptyNotificationBell"
                      }
                      size={30}
                      fill="#000"
                      style={{ marginRight: "1rem", marginLeft: "1rem" }}
                    />
                  </a>
                </NextLink>
                <Menu
                  options={["logout"]}
                  renderOption={({ Anchor }) => (
                    <NextLink key="logout" href="/logout">
                      {Anchor}
                    </NextLink>
                  )}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar size={32} src={data!.me!.pictureUrl} alt="avatar" />
                    <Icon fill="#333" name="downArrow" />
                  </div>
                </Menu>
              </Flex>
            );
          }

          return (
            <div>
              <a href="http://localhost:4000/auth/github">
                <GitHubButton>Sign in with GitHub</GitHubButton>
              </a>
            </div>
          );
        }}
      </MeComponent>
    </Container>
  );
};
