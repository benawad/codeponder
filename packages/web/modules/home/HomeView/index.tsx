import { MyButton, PostRow, SidebarCard, Topic } from "@codeponder/ui";
import { NextContext } from "next";
import * as React from "react";
import { Box, Text } from "rebass";
import { FindPostComponent } from "../../../generated/apollo-components";
import { findPostQuery } from "../../../graphql/post/queries/findPost";
import { Link } from "../../../server/routes";
import { Layout } from "../../shared/Layout";

interface Props {
  topic?: string;
}

export const HomeView = ({ topic: initialTopic }: Props) => {
  const [topics, setTopics] = React.useState(
    initialTopic ? [initialTopic] : []
  );

  const handleTopic = (topicClicked: string) => {
    if (!topics.includes(topicClicked)) {
      setTopics(currentTopics => [topicClicked, ...currentTopics]);
    }
  };

  const removeTopic = (topicToDelete: string) => {
    setTopics(currentTopics => currentTopics.filter(x => x !== topicToDelete));
  };

  return (
    <Layout title="Code Ponder">
      <FindPostComponent
        variables={{
          input: {
            topics,
          },
        }}
      >
        {({ data, fetchMore }) => {
          return (
            <div>
              <div>
                {topics.map(topic => (
                  <Topic key={topic} onClick={() => removeTopic(topic)}>
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
                          onTopicClick={handleTopic}
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
                                    topics,
                                    cursor:
                                      data.findPost.posts[
                                        data.findPost.posts.length - 1
                                      ].createdAt,
                                  },
                                },
                                updateQuery: (
                                  previous,
                                  { fetchMoreResult }
                                ) => {
                                  if (!fetchMoreResult) {
                                    return previous;
                                  }

                                  return {
                                    findPost: {
                                      __typename: "FindPostResponse",
                                      hasMore: fetchMoreResult.findPost.hasMore,
                                      posts: [
                                        ...previous.findPost.posts,
                                        ...fetchMoreResult.findPost.posts,
                                      ],
                                    },
                                  };
                                },
                              });
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
                    With Code Ponder you can post your code from GitHub and get
                    reviewed on it.
                  </Text>
                </SidebarCard>
              </div>
            </div>
          );
        }}
      </FindPostComponent>
    </Layout>
  );
};

HomeView.getInitialProps = ({
  query: { topic },
}: NextContext<{ topic?: string }>) => {
  return { topic };
};
