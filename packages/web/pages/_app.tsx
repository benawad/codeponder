import { GlobalStyle, theme, ThemeProvider } from "@codeponder/ui";
import { ApolloClient, NormalizedCacheObject } from "apollo-boost";
import App, { Container } from "next/app";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import ReactModal from "react-modal";
import "../empty.css";
import withApolloClient from "../lib/with-apollo-client";
import { GitHubApolloClientContext } from "../modules/shared/GithubApolloClientContext";

if (typeof window !== "undefined") {
  ReactModal.setAppElement("body");
}
interface Props {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  githubApolloClient: ApolloClient<NormalizedCacheObject>;
}
class MyApp extends App<Props> {
  render(): JSX.Element {
    const {Component, pageProps, apolloClient, githubApolloClient} = this.props;
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
