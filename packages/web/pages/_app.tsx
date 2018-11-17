import App, { Container } from "next/app";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { Container as SemanticContainer } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import withApolloClient from "../lib/with-apollo-client";

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props as any;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <SemanticContainer>
            <Component {...pageProps} />
          </SemanticContainer>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
