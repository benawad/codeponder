import { MyButton, PostRow, SidebarCard, Topic } from "@codeponder/ui";
import * as React from "react";
import { Box } from "rebass";
import {
  FindCodeReviewPostComponent,
  FindCodeReviewPostQuery,
} from "../../../generated/apollo-components";
import { findCodeReviewPostQuery } from "../../../graphql/code-review-post/queries/findCodeReviewPost";
import { Link } from "../../../server/routes";
import { Layout } from "../../shared/Layout";

interface State {
  limit: number;
  offset: number;
  topics: string[];
}
export class HomeView extends React.Component<{}, State> {
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
                <div style={{ display: "flex", marginBottom: "6.4rem" }}>
                  {this.state.topics.map(topic => (
                    <Topic key={topic} onClick={() => this.removeTopic(topic)}>
                      {topic}
                    </Topic>
                  ))}
                  <SidebarCard flex="1">
                    {data && data.findCodeReviewPost && (
                      <>
                        {data.findCodeReviewPost.posts.map(post => (
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
                        {data.findCodeReviewPost.hasMore ? (
                          <Box my="1.6rem" ml="1.6rem">
                            <MyButton
                              variant="primary"
                              onClick={async () => {
                                await fetchMore({
                                  query: findCodeReviewPostQuery,
                                  variables: {
                                    input: {
                                      ...this.state,
                                      offset:
                                        this.state.offset + this.state.limit,
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
                      </>
                    )}
                  </SidebarCard>
                  <SidebarCard flex="0 0 24rem" ml="4rem">
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
