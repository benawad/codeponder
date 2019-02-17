import { distanceInWordsToNow } from "date-fns";
import * as React from "react";
import { Box, Flex, Text } from "rebass";
import styled from "../../theme/styled-components";
import { Avatar } from "../Avatar";
import { Topic } from "../Topic";

interface Props {
  id: string;
  title: string;
  repo: string;
  commitId: string;
  repoOwner: string;
  topics: string[];
  onTopicClick?: (topic: string) => void;
  numQuestions: number;
  createdAt: string;
  creator: {
    id: string;
    username: string;
    pictureUrl: string;
  };
  Link: any;
  getLinkProps: () => any;
}

export const PostRowContainer = styled("div")`
  border-width: 0 0 0.1rem 0;
  border-style: solid;
  padding: 1.2rem;
  border-color: #e6eaef;
`;

export const PostRow: React.SFC<Props> = ({
  title,
  repo,
  repoOwner,
  topics,
  creator: { pictureUrl },
  getLinkProps,
  Link,
  createdAt,
  onTopicClick,
}) => {
  const linkProps = getLinkProps();
  const dtString = distanceInWordsToNow(Date.parse(createdAt), {
    addSuffix: true,
  });

  return (
    <PostRowContainer>
      <Flex justifyContent="center">
        <Avatar size={34} src={pictureUrl} alt="avatar" />
        <div
          style={{
            paddingLeft: ".8rem",
            justifyContent: "center",
            flexDirection: "column",
            marginRight: "auto",
          }}
        >
          <Link {...linkProps}>
            <a>
              <Text fontSize={5} fontFamily="rubik">
                {title}
              </Text>
            </a>
          </Link>
          <Link {...linkProps}>
            <a>
              <Text
                lineHeight="1rem"
                fontFamily="rubik"
                fontSize={3}
                color="neutrals.2"
                mb="1.2rem"
              >
                {repoOwner}/{repo} • {dtString}
              </Text>
            </a>
          </Link>
          <Box mt=".4rem">
            {topics.slice(0, 3).map(topic => (
              <Topic
                key={topic}
                onClick={() => {
                  if (onTopicClick) {
                    onTopicClick(topic);
                  }
                }}
              >
                {topic}
              </Topic>
            ))}
          </Box>
        </div>
      </Flex>
    </PostRowContainer>
  );
};
