import { MyButton, PostRow, SidebarCard, Topic } from "@codeponder/ui";
import { NextContext } from "next";
import * as React from "react";
import { Box, Text } from "rebass";
import {
  FindPostComponent,
  FindPostQuery,
} from "../../../generated/apollo-components";
import { findPostQuery } from "../../../graphql/post/queries/findPost";
import { Link } from "../../../server/routes";
import { Layout } from "../../shared/Layout";

interface State {
  limit: number;
  offset: number;
  topics: string[];
}

interface Props {
  topic?: string;
}
export class HomeView extends React.Component<Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      topics: props.topic ? [props.topic] : [],
      limit: 6,
      offset: 0,
    };
  }

  static getInitialProps({
    query: { topic },
  }: NextContext<{ topic?: string }>) {
    return { topic };
  }

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
        <FindPostComponent
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
                <div>
                  {this.state.topics.map(topic => (
                    <Topic key={topic} onClick={() => this.removeTopic(topic)}>
                      {topic}
                    </Topic>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    marginBottom: "6.4rem",
                  }}
                >
                  <SidebarCard flex="1">
                    {data && data.findPost && (
                      <>
                        {data.findPost.posts.map(post => (
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
                        {data.findPost.hasMore ? (
                          <Box my="1.6rem" ml="1.6rem">
                            <MyButton
                              variant="primary"
                              onClick={async () => {
                                await fetchMore({
                                  query: findPostQuery,
                                  variables: {
                                    input: {
                                      ...this.state,
                                      offset:
                                        this.state.offset + this.state.limit,
                                    },
                                  },
                                  updateQuery: (
                                    previous: FindPostQuery,
                                    { fetchMoreResult }: any
                                  ) => {
                                    if (!fetchMoreResult) {
                                      return previous;
                                    }

                                    return {
                                      ...previous,
                                      findPost: {
                                        ...previous.findPost,
                                        hasMore:
                                          fetchMoreResult.findPost.hasMore,
                                        posts: [
                                          ...previous.findPost.posts,
                                          ...fetchMoreResult.findPost.posts,
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
                  <SidebarCard flex="0 0 24rem" ml="4rem" p="1rem">
                    <Text fontFamily="rubik">
                      With Code Ponder you can post your code from GitHub and
                      get reviewed on it.
                    </Text>
                  </SidebarCard>
                </div>
              </div>
            );
          }}
        </FindPostComponent>
      </Layout>
    );
  }
}
