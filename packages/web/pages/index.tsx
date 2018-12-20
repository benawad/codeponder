import * as React from "react";
import { PostRow, MyButton, Topic } from "@codeponder/ui";

import { FindCodeReviewPostComponent } from "../components/apollo-components";
import { Link } from "../server/routes";
import { Layout } from "../components/Layout";
import { Box } from "rebass";

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
        <FindCodeReviewPostComponent variables={{ input: this.state }}>
          {({ data }) => {
            return (
              <div>
                <div style={{ width: 776, margin: "auto" }}>
                  {this.state.topics.map(topic => (
                    <Topic key={topic} onClick={() => this.removeTopic(topic)}>
                      {topic}
                    </Topic>
                  ))}
                  {data &&
                    data.findCodeReviewPost.map(post => (
                      <Box key={post.id} pb=".5rem">
                        <PostRow
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
                      </Box>
                    ))}
                </div>
                {data && data.findCodeReviewPost.length ? (
                  <div>
                    <MyButton
                      variant="primary"
                      onClick={() =>
                        this.setState(state => ({
                          offset: state.offset + state.limit,
                        }))
                      }
                    >
                      next
                    </MyButton>
                  </div>
                ) : null}
              </div>
            );
          }}
        </FindCodeReviewPostComponent>
      </Layout>
    );
  }
}
