import { BigCard, FolderTree } from "@codeponder/ui";
import { orderBy } from "lodash";
import "prismjs";
import * as React from "react";
import { Box, Heading } from "rebass";
import { GetCodeReviewPostByIdQuery } from "../../../generated/apollo-components";
import {
  GetRepoObjectComponent,
  GetRepoObjectDocument,
  GetRepoObjectTreeInlineFragment,
} from "../../../generated/github-apollo-components";
import { getCodeReviewPostByIdQuery } from "../../../graphql/code-review-post/queries/getCodeReviewPostById";
import redirect from "../../../lib/redirect";
import { Link } from "../../../server/routes";
import { NextContextWithApollo } from "../../../types/NextContextWithApollo";
import { filenameToLang } from "../../../utils/filenameToLang";
import { GitHubApolloClientContext } from "../../shared/GithubApolloClientContext";
import { Layout } from "../../shared/Layout";
import { TopicLink } from "../../shared/TopicLink";
import { CodeFile } from "../shared/CodeFile";
import { ContextProps, PostContext } from "../shared/PostContext";
import { QuestionSection } from "../shared/QuestionSection";
import { FilePath } from "./FilePath";

interface Props {
  id: string;
  path?: string;
  owner: string;
  name: string;
  expression: string;
  topics: string[];
}

export class CodeReviewPostView extends React.PureComponent<Props> {
  static contextType = GitHubApolloClientContext;
  static async getInitialProps({
    query: { id, path },
    githubApolloClient,
    apolloClient,
    ...ctx
  }: NextContextWithApollo) {
    const response = await apolloClient.query<GetCodeReviewPostByIdQuery>({
      query: getCodeReviewPostByIdQuery,
      variables: {
        id,
      },
    });

    const { getCodeReviewPostById } = response.data;

    if (!getCodeReviewPostById) {
      redirect(ctx, "/not-found");
      return {};
    }

    const expression = `${getCodeReviewPostById.commitId}:${path || ""}`;

    await githubApolloClient.query({
      query: GetRepoObjectDocument,
      variables: {
        name: getCodeReviewPostById.repo,
        owner: getCodeReviewPostById.repoOwner,
        expression,
      },
    });

    return {
      id,
      path,
      expression,
      name: getCodeReviewPostById.repo,
      owner: getCodeReviewPostById.repoOwner,
      topics: getCodeReviewPostById.topics,
    };
  }

  render() {
    const { owner, path, name, expression, id, topics } = this.props;
    const context: ContextProps = {
      lang: path ? filenameToLang(path) : "",
      owner,
      path,
      postId: id,
    };
    return (
      <Layout title={`Code Review Post: ${name}`}>
        <BigCard>
          <Heading m="0rem" fontFamily="rubik" fontSize={6}>
            {owner}/{name}
          </Heading>
          <Box mt={10} mb={16}>
            {path ? (
              <FilePath id={id} name={name} path={path} />
            ) : (
              topics.map(topic => <TopicLink key={topic} topic={topic} />)
            )}
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
                context.code = object.text;
                context.totalLines = (object.text || "").split("\n").length;
                return (
                  <>
                    <PostContext.Provider value={context}>
                      <CodeFile />
                    </PostContext.Provider>
                  </>
                );
              }

              if (object.__typename === "Tree") {
                const entries =
                  (data.repository.object as GetRepoObjectTreeInlineFragment)
                    .entries || [];
                return (
                  <>
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
            <PostContext.Provider value={context}>
              <QuestionSection
                variables={{
                  postId: id,
                }}
              />
            </PostContext.Provider>
          )}
        </BigCard>
      </Layout>
    );
  }
}
