import * as React from "react";
import { Card, Flex, Text, Box } from "rebass";
import { distanceInWordsStrict } from "date-fns";

import { Avatar } from "../Avatar";
import { Topic } from "../Topic";
import styled from "../../theme/styled-components";

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

const BorderCard = styled(Card)`
  border-width: 0 0 0.1rem 0;
  border-style: solid;
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
}) => {
  const linkProps = getLinkProps();
  const dtString = distanceInWordsStrict(new Date(), Date.parse(createdAt), {
    addSuffix: true,
  });

  return (
    <BorderCard p="1.2rem" borderColor="neutrals.3">
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
              <Topic key={topic}>{topic}</Topic>
            ))}
          </Box>
        </div>
      </Flex>
    </BorderCard>
  );
};
