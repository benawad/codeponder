import { GlobalStyle, theme, ThemeProvider } from "@codeponder/ui";
import App, { Container } from "next/app";
import React from "react";
import { ApolloProvider } from "react-apollo";
import ReactModal from "react-modal";
import "../empty.css";
import withApolloClient from "../lib/with-apollo-client";
import { GitHubApolloClientContext } from "../modules/shared/GithubApolloClientContext";

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
