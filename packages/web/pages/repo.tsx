import * as React from "react";
import { FolderTree } from "@codeponder/ui";

import { GitHubApolloClientContext } from "../components/GithubApolloClientContext";
import { NextContextWithApollo } from "../types/NextContextWithApollo";
import {
  GetRepoObjectComponent,
  GetRepoObjectTreeInlineFragment,
  GetRepoObjectDocument
} from "../components/github-apollo-components";
import { Link } from "../server/routes";

interface Props {
  branch: string;
  path?: string;
  owner: string;
  name: string;
  expression: string;
}

export default class Repo extends React.PureComponent<Props> {
  static contextType = GitHubApolloClientContext;
  static async getInitialProps({
    query: { branch, owner, path, name },
    githubApolloClient
  }: NextContextWithApollo) {
    const expression = `${branch}:${path || ""}`;

    await githubApolloClient.query({
      query: GetRepoObjectDocument,
      variables: {
        name,
        owner,
        expression
      }
    });

    return {
      branch,
      owner,
      path,
      name,
      expression
    };
  }

  render() {
    const { branch, owner, path, name, expression } = this.props;

    return (
      <GetRepoObjectComponent
        variables={{
          name,
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
                    name
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
