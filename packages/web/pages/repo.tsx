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
import { CodeFile } from "../components/CodeFile";

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

  renderFilePath = (name: string, path?: string) => {
    if (!path) {
      return null;
    }

    const parts = [name, ...path.split("/")];
    const currentPath: string[] = [];

    return parts.map((part, idx) => {
      if (idx) {
        currentPath.push(part);
      }

      return idx === parts.length - 1 ? (
        <span key={part + idx}>{part}</span>
      ) : (
        <React.Fragment key={part + idx}>
          <Link
            route="repo"
            params={{
              branch: this.props.branch,
              owner: this.props.owner,
              path: [...currentPath] as any,
              name
            }}
          >
            <a>{part}</a>
          </Link>
          /
        </React.Fragment>
      );
    });
  };

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
            return (
              <>
                {this.renderFilePath(name, path)}
                <CodeFile
                  branch={branch}
                  repo={name}
                  username={owner}
                  path={path}
                  code={object.text}
                />
              </>
            );
          }

          if (object.__typename === "Tree") {
            return (
              <>
                {this.renderFilePath(name, path)}
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
                      path: [
                        ...(path ? path.split("/") : []),
                        ...itemPath.split("/")
                      ] as any,
                      name
                    }
                  })}
                />
              </>
            );
          }

          return "something went wrong";
        }}
      </GetRepoObjectComponent>
    );
  }
}
