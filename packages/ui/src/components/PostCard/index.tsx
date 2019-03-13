import * as React from "react";
import styled from "../../theme/styled-components";
import { Avatar } from "../Avatar";
import { LinkProps, RouteLinkProps } from "../Link";
import { Topic } from "../Topic";

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
  Link: React.ComponentType<LinkProps> | React.FunctionComponent;
  getLinkProps: () => RouteLinkProps;
}

const Container = styled.div`
  border-radius: 0.9rem;
  overflow: hidden;
  box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.12),
    0 0.1rem 0.2rem rgba(0, 0, 0, 0.24);
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-size: 1.6rem;
  color: #07385a;
  cursor: pointer;
`;

const CardBodyText = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 1.3rem;
  color: #78909c;
  padding: 0.6rem 0;
  margin-top: auto;
`;

const CardFooter = styled.div`
  display: flex;
`;

const Username = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 1.2rem;
  color: #3290d4;
  padding-left: 0.8rem;
`;

export const PostCard: React.FC<Props> = ({
  repo,
  topics,
  repoOwner,
  title,
  onTopicClick,
  creator: { pictureUrl, username },
  Link,
  getLinkProps,
}): JSX.Element => {
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
