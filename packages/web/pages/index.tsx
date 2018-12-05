import * as React from "react";
import { NextContextWithApollo } from "../types/NextContextWithApollo";
import gql from "graphql-tag";

export default class Index extends React.PureComponent {
  static async getInitialProps({ apolloClient }: NextContextWithApollo) {
    const response: any = await apolloClient.query({
      query: gql`
        {
          me {
            id
            username
            pictureUrl
            bio
          }
        }
      `
    });

    return response.data.me;
  }

  render() {
    const { pictureUrl } = this.props as any;
    return (
      <div>
        <img src={pictureUrl} />
      </div>
    );
  }
}
