import { distanceInWordsToNow } from "date-fns";
import React from "react";
import { Text } from "rebass";
import { MyButton } from "../MyButton";
import { PostRowContainer } from "../PostRow";

interface Props {
  type: string;
  createdAt: string;
  read: boolean;
  comment: {
    id: string;
    creator: {
      username: string;
      pictureUrl: string;
    };
  };

  question: {
    title: string;
    post: {
      repo: string;
      creator: {
        username: string;
      };
    };
  };
  renderQuestionLink: (body: JSX.Element) => JSX.Element;
  renderRepoLink: (body: JSX.Element | string) => JSX.Element;
  onMarkAsClick: () => void;
}

export const NotificationRow: React.FC<Props> = ({
  type,
  comment,
  question,
  createdAt,
  renderQuestionLink,
  renderRepoLink,
  read,
  onMarkAsClick,
}) => {
  const dtString = distanceInWordsToNow(Date.parse(createdAt), {
    addSuffix: true,
  });

  return (
    <PostRowContainer>
      <div style={{ fontWeight: 600 }}>
        {renderRepoLink(
          `${question.post.creator.username}/${question.post.repo}`
        )}
      </div>
      <div style={{ display: "flex" }}>&nbsp;</div>
      <div style={{ display: "flex" }}>
        <span>{comment.creator.username}</span>
        &nbsp;{type === "reply" ? "commented in" : "mentioned you in"}&nbsp;
        {renderQuestionLink(<div>{question.title}</div>)}
        &nbsp;
        <Text color="neutrals.2">• {dtString}</Text>
        <MyButton
          style={{ marginLeft: "1rem" }}
          variant="topic"
          onClick={onMarkAsClick}
        >
          {read ? "mark as unread" : "mark as read"}
        </MyButton>
      </div>
    </PostRowContainer>
  );
};
