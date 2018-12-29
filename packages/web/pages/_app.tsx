import App, { Container } from "next/app";
import React from "react";
import { ThemeProvider, theme, GlobalStyle } from "@codeponder/ui";
import { ApolloProvider } from "react-apollo";
import ReactModal from "react-modal";

import withApolloClient from "../lib/with-apollo-client";
import { GitHubApolloClientContext } from "../components/GithubApolloClientContext";

import "../empty.css";

if (typeof window !== "undefined") {
  ReactModal.setAppElement("body");
}

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient, githubApolloClient } = this
      .props as any;
    return (
      <Container>
        <GlobalStyle />
        {/*
          // @ts-ignore */}
        <ThemeProvider theme={theme}>
          {/*
          // @ts-ignore */}
          <GitHubApolloClientContext.Provider value={githubApolloClient}>
            <ApolloProvider client={apolloClient}>
              <Component {...pageProps} />
            </ApolloProvider>
          </GitHubApolloClientContext.Provider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
