import * as React from "react";
import { MeMe, MeQuery } from "../../generated/apollo-components";
import { meQuery } from "../../graphql/user/query/me";
import redirect from "../../lib/redirect";
import { NextContextWithApollo } from "../../types/NextContextWithApollo";

export const withAuth = <T extends object>(
  C: React.ComponentClass<T>
): React.ComponentClass<T> => {
  return class AuthComponent extends React.Component<T> {
    static async getInitialProps({
      apolloClient,
      ...ctx
    }: NextContextWithApollo): Promise<{ me: MeMe | null }> {
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

    render(): JSX.Element {
      return <C {...this.props} />;
    }
  };
};
