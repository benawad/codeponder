import * as React from "react";
import { Card, Flex, Text } from "rebass";
import { distanceInWordsStrict } from "date-fns";

import { Avatar } from "../Avatar";
import { Icon } from "../Icon";

interface Props {
  id: string;
  text: string;
  programmingLanguage?: string | null;
  codeSnippet?: string | null;
  numReplies: number;
  createdAt: string;
  path?: string | null;
  creator: {
    id: string;
    username: string;
    pictureUrl: string;
    bio: string;
    accessToken?: string | null;
  };
}

export const GrayText = ({ children }: { children: React.ReactNode }) => (
  <Text fontSize={1} fontFamily="rubik" color="#A5A5A5" pl=".4rem" pr=".8rem">
    {children}
  </Text>
);

export const Question = ({
  text,
  path,
  numReplies,
  createdAt,
  creator: { username, pictureUrl },
}: Props) => {
  const dtString = distanceInWordsStrict(new Date(), Date.parse(createdAt), {
    addSuffix: true,
  });

  return (
    <Card p="1rem">
      <Flex>
        <Avatar m="0rem" size={28} src={pictureUrl} />
        <Flex flexDirection="column" justifyContent="center" ml=".6rem">
          <Text mb=".2rem" fontFamily="rubik" fontSize={2}>
            {username}
          </Text>
          <Flex>
            <Icon size={12} name="comment" fill="#A5A5A5" />
            <GrayText>{numReplies}</GrayText>
            <Icon size={12} name="clock" fill="#A5A5A5" />
            <GrayText>{dtString}</GrayText>
          </Flex>
        </Flex>
      </Flex>
      <Text my="1rem" fontFamily="rubik" fontSize={2} color="#78909C">
        {text}
      </Text>
      <Flex alignItems="center">
        <Icon name="link" fill="#a5a5a5" />
        <GrayText>This code is a reference to: {path}</GrayText>
      </Flex>
    </Card>
  );
};
