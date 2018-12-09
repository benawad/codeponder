import App, { Container } from "next/app";
import React from "react";
import { ApolloProvider } from "react-apollo";

import withApolloClient from "../lib/with-apollo-client";
import { ThemeProvider, theme } from "@codeponder/ui";
import { GitHubApolloClientContext } from "../components/GithubApolloClientContext";

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient, githubApolloClient } = this
      .props as any;
    return (
      <Container>
        <ThemeProvider theme={theme}>
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
