import React from "react";
import cookie from "cookie";
import PropTypes from "prop-types";
import { getDataFromTree } from "react-apollo";
import Head from "next/head";
import { IntrospectionFragmentMatcher } from "apollo-cache-inmemory";
import introspectionQueryResultData from "./github-api-fragments.json";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: introspectionQueryResultData as any,
});

import initApollo from "./init-apollo";
import { isBrowser } from "./isBrowser";
import { NormalizedCacheObject, ApolloClient } from "apollo-boost";
import { meQuery } from "../graphql/user/query/me";
import { MeQuery } from "../components/apollo-components";

function parseCookies(req?: any, options = {}) {
  return cookie.parse(
    req ? req.headers.cookie || "" : document.cookie,
    options
  );
}

const SERVER_LINK_OPTIONS = {
  uri: "http://localhost:4000/graphql",
  credentials: "include",
};
const GITHUB_LINK_OPTIONS = { uri: "https://api.github.com/graphql" };

export default (App: any) => {
  return class WithData extends React.Component {
    static displayName = `WithData(${App.displayName})`;
    static propTypes = {
      apolloState: PropTypes.object.isRequired,
    };

    static async getInitialProps(ctx: any) {
      const {
        Component,
        router,
        ctx: { req, res },
      } = ctx;
      const apollo = initApollo(
        SERVER_LINK_OPTIONS,
        {},
        {
          getToken: () => parseCookies(req).qid,
        }
      );

      const {
        data: { me },
      } = await apollo.query<MeQuery>({
        query: meQuery,
      });

      const githubApolloClient = initApollo(
        GITHUB_LINK_OPTIONS,
        {},
        {
          getToken: () => {
            return me ? me.accessToken : "";
          },
        },
        { fragmentMatcher }
      );

      ctx.ctx.apolloClient = apollo;
      ctx.ctx.githubApolloClient = githubApolloClient;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {};
      }

      if (!isBrowser) {
        // Run all graphql queries in the component tree
        // and extract the resulting data
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
              githubApolloClient={githubApolloClient}
            />
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error("Error while running `getDataFromTree`", error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo's store
      const apolloState = apollo.cache.extract();
      const githubApolloState = githubApolloClient.cache.extract();

      return {
        ...appProps,
        me,
        apolloState,
        githubApolloState,
      };
    }

    apolloClient: ApolloClient<NormalizedCacheObject>;
    githubApolloClient: ApolloClient<NormalizedCacheObject>;

    constructor(props: any) {
      super(props);
      // `getDataFromTree` renders the component first, the client is passed off as a property.
      // After that rendering is done using Next's normal rendering pipeline
      this.apolloClient = initApollo(SERVER_LINK_OPTIONS, props.apolloState, {
        getToken: () => {
          return parseCookies().qid;
        },
      });

      this.githubApolloClient = initApollo(
        GITHUB_LINK_OPTIONS,
        props.githubApolloState,
        {
          getToken: () => {
            return props.me ? props.me.accessToken : "";
          },
        },
        { fragmentMatcher }
      );
    }

    render() {
      return (
        <App
          {...this.props}
          apolloClient={this.apolloClient}
          githubApolloClient={this.githubApolloClient}
        />
      );
    }
  };
};
