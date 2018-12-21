import * as React from "react";
import { PostRow, MyButton, Topic, SidebarCard } from "@codeponder/ui";

import {
  FindCodeReviewPostComponent,
  FindCodeReviewPostQuery,
} from "../components/apollo-components";
import { Link } from "../server/routes";
import { Layout } from "../components/Layout";
import { Box } from "rebass";
import { findCodeReviewPostQuery } from "../graphql/code-review-post/queries/findCodeReviewPost";

interface State {
  limit: number;
  offset: number;
  topics: string[];
}
export default class Index extends React.Component<{}, State> {
  state: State = {
    topics: [],
    limit: 6,
    offset: 0,
  };

  handleTopic = (topic: string) => {
    if (!this.state.topics.includes(topic)) {
      this.setState(state => ({
        topics: [topic, ...state.topics],
      }));
    }
  };

  removeTopic = (topic: string) => {
    this.setState(state => ({
      topics: state.topics.filter(x => x !== topic),
    }));
  };

  render() {
    return (
      // @ts-ignore
      <Layout title="Code Ponder">
        <FindCodeReviewPostComponent
          variables={{
            input: {
              ...this.state,
              offset: 0,
            },
          }}
        >
          {({ data, fetchMore }) => {
            return (
              <div>
                <div style={{ display: "flex", marginBottom: "4rem" }}>
                  {this.state.topics.map(topic => (
                    <Topic key={topic} onClick={() => this.removeTopic(topic)}>
                      {topic}
                    </Topic>
                  ))}
                  <SidebarCard flex="1">
                    {data &&
                      data.findCodeReviewPost.posts.map(post => (
                        <PostRow
                          key={post.id}
                          Link={Link}
                          onTopicClick={this.handleTopic}
                          getLinkProps={() => ({
                            route: "post",
                            params: {
                              id: post.id,
                            },
                          })}
                          {...post}
                        />
                      ))}
                    {data && data.findCodeReviewPost.hasMore ? (
                      <Box my="1rem" ml="1rem">
                        <MyButton
                          variant="primary"
                          onClick={async () => {
                            await fetchMore({
                              query: findCodeReviewPostQuery,
                              variables: {
                                input: {
                                  ...this.state,
                                  offset: this.state.offset + this.state.limit,
                                },
                              },
                              updateQuery: (
                                previous: FindCodeReviewPostQuery,
                                { fetchMoreResult }: any
                              ) => {
                                if (!fetchMoreResult) {
                                  return previous;
                                }

                                return {
                                  ...previous,
                                  findCodeReviewPost: {
                                    ...previous.findCodeReviewPost,
                                    hasMore:
                                      fetchMoreResult.findCodeReviewPost
                                        .hasMore,
                                    posts: [
                                      ...previous.findCodeReviewPost.posts,
                                      ...fetchMoreResult.findCodeReviewPost
                                        .posts,
                                    ],
                                  },
                                };
                              },
                            });
                            this.setState(state => ({
                              offset: state.offset + state.limit,
                            }));
                          }}
                        >
                          load more
                        </MyButton>
                      </Box>
                    ) : null}
                  </SidebarCard>
                  <SidebarCard flex="0 0 240px" ml="2.5rem">
                    i am sidebar
                  </SidebarCard>
                </div>
              </div>
            );
          }}
        </FindCodeReviewPostComponent>
      </Layout>
    );
  }
}
