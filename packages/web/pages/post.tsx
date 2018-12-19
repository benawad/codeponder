import * as React from "react";
import { FolderTree } from "@codeponder/ui";
import "prismjs";

import { GitHubApolloClientContext } from "../components/GithubApolloClientContext";
import { NextContextWithApollo } from "../types/NextContextWithApollo";
import {
  GetRepoObjectComponent,
  GetRepoObjectTreeInlineFragment,
  GetRepoObjectDocument,
} from "../components/github-apollo-components";
import { Link } from "../server/routes";
import { CodeFile } from "../components/CodeFile";
import { getCodeReviewPostByIdQuery } from "../graphql/code-review-post/queries/getCodeReviewPostById";
import { GetCodeReviewPostByIdQuery } from "../components/apollo-components";

interface Props {
  id: string;
  path?: string;
  owner: string;
  name: string;
  expression: string;
}

export default class Post extends React.PureComponent<Props> {
  static contextType = GitHubApolloClientContext;
  static async getInitialProps({
    query: { id, path },
    githubApolloClient,
    apolloClient,
  }: NextContextWithApollo) {
    const response = await apolloClient.query<GetCodeReviewPostByIdQuery>({
      query: getCodeReviewPostByIdQuery,
      variables: {
        id,
      },
    });

    const { getCodeReviewPostById } = response.data;

    const expression = `${getCodeReviewPostById!.commitId}:${path || ""}`;

    await githubApolloClient.query({
      query: GetRepoObjectDocument,
      variables: {
        name: getCodeReviewPostById!.repo,
        owner: getCodeReviewPostById!.repoOwner,
        expression,
      },
    });

    return {
      id,
      path,
      expression,
      name: getCodeReviewPostById!.repo,
      owner: getCodeReviewPostById!.repoOwner,
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
        // @ts-ignore
        <React.Fragment key={part + idx}>
          {/*
          // @ts-ignore */}
          <Link
            route="post"
            params={{
              id: this.props.id,
              path: [...currentPath] as any,
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
    const { owner, path, name, expression, id } = this.props;
    return (
      <GetRepoObjectComponent
        variables={{
          name,
          owner,
          expression,
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
                <CodeFile path={path} code={object.text} postId={id} />
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
                    route: "post",
                    params: {
                      path: [
                        ...(path ? path.split("/") : []),
                        ...itemPath.split("/"),
                      ] as any,
                      id,
                    },
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
