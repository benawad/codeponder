import * as React from "react";
import { NextContextWithApollo } from "../types/NextContextWithApollo";
import { meQuery } from "../graphql/user/query/me";
import { MeQuery } from "./apollo-components";
import redirect from "../lib/redirect";

export const withAuth = <T extends object>(C: React.ComponentClass<T>) => {
  return class AuthComponent extends React.Component<T> {
    static async getInitialProps({
      apolloClient,
      ...ctx
    }: NextContextWithApollo) {
      const response = await apolloClient.query<MeQuery>({ query: meQuery });
      if (!response || !response.data || !response.data.me) {
        redirect(ctx, "/");
        return {
          me: null,
        };
      }

      return {
        me: response.data.me,
      };
    }

    render() {
      return <C {...this.props} />;
    }
  };
};
