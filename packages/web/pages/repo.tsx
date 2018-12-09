import * as React from "react";
import { GitCreateTreeResponseTreeItem } from "@octokit/rest";
// import { FolderTree } from "@codeponder/ui";

// import { NextContextWithApollo } from "../types/NextContextWithApollo";
// import { octokit } from "../lib/octo";
import { GetRepoObjectComponent } from "../components/github-apollo-components";
import { apolloGitHubClient } from "../lib/with-apollo-client";
import { GitHubApolloClientContext } from "../components/GithubApolloClientContext";

interface Props {
  fileTree: GitCreateTreeResponseTreeItem[];
}

export default class Repo extends React.PureComponent<Props> {
  static contextType = GitHubApolloClientContext;
  // static async getInitialProps({ query }: NextContextWithApollo) {
  //   const response = await octokit.git.getTree({
  //     ...(query as any),
  //     tree_sha: "master"
  //   });
  //   return {
  //     fileTree: response.data.tree,
  //     query
  //   };
  // }
  //           <FolderTree
  //             items={fileTree}
  //             onItemPress={path => console.log(path)}
  //           />

  render() {
    // const { fileTree } = this.props;
    return (
      <GetRepoObjectComponent
        variables={{
          name: "codeponder",
          owner: "benawad",
          expression: "master:packages/server"
        }}
        client={this.context}
      >
        {({ data }) => {
          console.log(data);
          return null;
        }}
      </GetRepoObjectComponent>
    );
  }
}
