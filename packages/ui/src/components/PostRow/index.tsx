import * as React from "react";
import { Card, Flex, Text } from "rebass";
import { distanceInWordsStrict } from "date-fns";

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

export const PostRow: React.SFC<Props> = ({
  title,
  repo,
  repoOwner,
  topics,
  creator: { pictureUrl },
  getLinkProps,
  Link,
  createdAt,
}) => {
  const linkProps = getLinkProps();
  const dtString = `${distanceInWordsStrict(
    new Date(),
    Date.parse(createdAt)
  )} ago`;

  return (
    <Card
      py=".6rem"
      px=".75rem"
      bg="#fff"
      borderRadius={5}
      boxShadow="0px 2px 5px rgba(0, 0, 0, 0.1)"
    >
      <Flex justifyContent="center">
        <Avatar size={34} src={pictureUrl} alt="avatar" />
        <div
          style={{
            paddingLeft: "1rem",
            paddingRight: "2rem",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginRight: "auto",
          }}
        >
          <Link {...linkProps}>
            <a>
              <Text fontFamily="rubik" fontSize={1} color="neutrals.2">
                {repoOwner}/{repo}
              </Text>
            </a>
          </Link>
          <Link {...linkProps}>
            <a>
              <Text fontSize={5} fontFamily="rubik">
                {title}
              </Text>
            </a>
          </Link>
          <Flex alignItems="center">
            {topics.slice(0, 3).map(topic => (
              <Topic key={topic}>{topic}</Topic>
            ))}
          </Flex>
        </div>
        <div>{dtString}</div>
      </Flex>
    </Card>
  );
};
