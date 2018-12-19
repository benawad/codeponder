import App, { Container } from "next/app";
import React from "react";
import { ThemeProvider, theme } from "@codeponder/ui";
import { ApolloProvider } from "react-apollo";

import withApolloClient from "../lib/with-apollo-client";
import { GitHubApolloClientContext } from "../components/GithubApolloClientContext";

import "../empty.css";

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient, githubApolloClient } = this
      .props as any;
    return (
      <Container>
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
