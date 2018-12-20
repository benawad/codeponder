import * as React from "react";
import styled from "../../theme/styled-components";
import { Topic } from "../Topic";
import { Avatar } from "../Avatar";

interface Props {
  id: string;
  title: string;
  repo: string;
  commitId: string;
  repoOwner: string;
  topics: string[];
  onTopicClick?: (topic: string) => void;
  creator: {
    id: string;
    username: string;
    pictureUrl: string;
  };
  Link: any;
  getLinkProps: () => any;
}

const Container = styled.div`
  border-radius: 9px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-size: 16px;
  color: #07385a;
  cursor: pointer;
`;

const CardBodyText = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 13px;
  color: #78909c;
  padding: 6px 0;
  flex: 1;
`;

const CardFooter = styled.div`
  display: flex;
`;

const Username = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 12px;

  color: #3290d4;
  padding-left: 8px;
`;

export const PostCard: React.SFC<Props> = ({
  repo,
  topics,
  repoOwner,
  title,
  onTopicClick,
  creator: { pictureUrl, username },
  Link,
  getLinkProps,
}) => {
  const linkProps = getLinkProps();

  return (
    <Container>
      <Link {...linkProps}>
        <a>
          <CardHeader>{title}</CardHeader>
        </a>
      </Link>
      <CardBodyText>
        <Link {...linkProps}>
          <a>
            <div>
              {repoOwner}/{repo}
            </div>
          </a>
        </Link>
      </CardBodyText>
      <CardFooter>
        <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
          <Avatar src={pictureUrl} alt="avatar" />
          <Username>{username}</Username>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {topics.map(topic => (
            <Topic
              key={topic}
              onClick={() => onTopicClick && onTopicClick(topic)}
            >
              {topic}
            </Topic>
          ))}
        </div>
      </CardFooter>
    </Container>
  );
};
