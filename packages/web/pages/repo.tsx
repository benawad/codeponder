import * as React from "react";
import { NextContextWithApollo } from "../types/NextContextWithApollo";
import { octokit } from "../lib/octo";

export default class Repo extends React.PureComponent {
  static async getInitialProps({ query }: NextContextWithApollo) {
    const response = await octokit.git.getTree({
      ...(query as any),
      tree_sha: "master"
    });
    return {
      fileTree: response.data
    };
  }

  render() {
    console.log(this.props);
    return null;
  }
}
