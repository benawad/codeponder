import * as React from "react";
import { FolderTree, BigCard, Topic } from "@codeponder/ui";
import "prismjs";
import { Heading, Box } from "rebass";
import { orderBy } from "lodash";

import { GitHubApolloClientContext } from "../components/GithubApolloClientContext";
import { NextContextWithApollo } from "../types/NextContextWithApollo";
import {
  GetRepoObjectComponent,
  GetRepoObjectTreeInlineFragment,
  GetRepoObjectDocument,
} from "../components/github-apollo-components";
import { Link } from "../server/routes";
import { CodeFile } from "../components/CodeFile";
import { CodeFileContext, ContextProps } from "../components/CodeFileContext";
import { filenameToLang } from "../utils/filenameToLang";
import { getCodeReviewPostByIdQuery } from "../graphql/code-review-post/queries/getCodeReviewPostById";
import { GetCodeReviewPostByIdQuery } from "../components/apollo-components";
import { Layout } from "../components/Layout";
import { QuestionSection } from "../components/QuestionSection";

interface Props {
  id: string;
  path?: string;
  owner: string;
  name: string;
  expression: string;
  topics: string[];
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
      topics: getCodeReviewPostById!.topics,
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
    const { owner, path, name, expression, id, topics } = this.props;
    return (
      // @ts-ignore
      <Layout title={`Code Review Post: ${name}`}>
        <BigCard>
          <Heading m="0rem" fontFamily="rubik" fontSize={6}>
            {owner}/{name}
          </Heading>
          <Box mt={10} mb={16}>
            {topics.map(topic => (
              <Topic key={topic}>{topic}</Topic>
            ))}
          </Box>
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
                const context: ContextProps = {
                  code: object.text,
                  lang: path ? filenameToLang(path) : "",
                  owner,
                  path,
                  postId: id,
                };
                return (
                  <>
                    {this.renderFilePath(name, path)}
                    {/*
                    // @ts-ignore */}
                    <CodeFileContext.Provider value={context}>
                      <CodeFile />
                    </CodeFileContext.Provider>
                  </>
                );
              }

              if (object.__typename === "Tree") {
                const entries =
                  (data.repository.object as GetRepoObjectTreeInlineFragment)
                    .entries || [];
                return (
                  <>
                    {this.renderFilePath(name, path)}
                    <FolderTree
                      items={orderBy(
                        entries,
                        ["type", "name"],
                        ["desc", "asc"]
                      )}
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
          {path ? null : (
            <QuestionSection
              variables={{
                postId: id,
              }}
              postId={id}
            />
          )}
        </BigCard>
      </Layout>
    );
  }
}
