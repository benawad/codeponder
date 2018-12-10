import * as React from "react";
import { FolderTree } from "@codeponder/ui";

import { GitHubApolloClientContext } from "../components/GithubApolloClientContext";
import { NextContextWithApollo } from "../types/NextContextWithApollo";
import {
  GetRepoObjectComponent,
  GetRepoObjectTreeInlineFragment
} from "../components/github-apollo-components";
import { Link } from "../server/routes";

interface Props {
  query: {
    branch: string;
    path?: string;
    owner: string;
    repo: string;
  };
}

export default class Repo extends React.PureComponent<Props> {
  static contextType = GitHubApolloClientContext;
  static async getInitialProps({ query }: NextContextWithApollo) {
    return {
      query
    };
  }

  render() {
    const {
      query: { branch, owner, path, repo }
    } = this.props;
    const expression = `${branch}:${path || ""}`;

    return (
      <GetRepoObjectComponent
        variables={{
          name: repo,
          owner,
          expression
        }}
        client={this.context}
      >
        {({ data, loading }) => {
          if (!data || loading) {
            return null;
          }

          if (!data.repository) {
            return "could not find repo";
          }

          if (!data.repository.object) {
            return "could not find folder/file";
          }

          const { object } = data.repository;

          if (object.__typename === "Blob") {
            return <pre>{object.text}</pre>;
          }

          if (object.__typename === "Tree") {
            return (
              <FolderTree
                items={
                  (data.repository.object as GetRepoObjectTreeInlineFragment)
                    .entries || []
                }
                Link={Link}
                getLinkProps={itemPath => ({
                  passHref: true,
                  route: "repo",
                  params: {
                    branch,
                    owner,
                    // path: `${path || ""}/${itemPath}`,
                    path: [
                      ...(path ? path.split("/") : []),
                      ...itemPath.split("/")
                    ] as any,
                    repo
                  }
                })}
              />
            );
          }

          return "something went wrong";
        }}
      </GetRepoObjectComponent>
    );
  }
}
