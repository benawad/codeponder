import * as React from "react";
import { GitCreateTreeResponseTreeItem } from "@octokit/rest";
import { FolderTree } from "@codeponder/ui";

import { NextContextWithApollo } from "../types/NextContextWithApollo";
import { octokit } from "../lib/octo";

interface Props {
  fileTree: GitCreateTreeResponseTreeItem[];
}

export default class Repo extends React.PureComponent<Props> {
  static async getInitialProps({ query }: NextContextWithApollo) {
    const response = await octokit.git.getTree({
      ...(query as any),
      tree_sha: "master"
    });
    return {
      fileTree: response.data.tree,
      query
    };
  }

  render() {
    const { fileTree } = this.props;
    return (
      <FolderTree items={fileTree} onItemPress={path => console.log(path)} />
    );
  }
}
