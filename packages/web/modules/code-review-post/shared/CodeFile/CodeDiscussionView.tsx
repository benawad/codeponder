import { CommentCard, styled } from "@codeponder/ui";
import React, { useContext, useState } from "react";
import { CodeReviewQuestionInfoFragment } from "../../../../generated/apollo-components";
import { CreateQuestionReply } from "../CreateQuestionReply";
import { PostContext } from "../PostContext";

interface CodeDiscussionViewProps {
  question: CodeReviewQuestionInfoFragment;
  toggleDiscussion: () => void;
  showDiscussion: boolean;
  lineNum: number;
}

const DiscussionNavBar = styled.div`
  background-color: #f6f8fa;
  border-bottom: 1px solid #e1e4e8;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  & .header-title {
    font-weight: 400;
    line-height: 1.125;
    margin-bottom: 0;
    word-wrap: break-word;
  }

  & .header-sub-title {
    color: #a3aab1;
    font-weight: 300;
    letter-spacing: -1px;
  }
`;

const DiscussionContainer = styled.div`
  background-color: #ffffff;
  border-top: 1px solid #dfe2e5;
  border-bottom: ${(p: { showReply: boolean }) =>
    p.showReply ? "none" : "1px solid #dfe2e5"};
  margin-bottom: 0px;
`;

const COLLAPSE = "Collapse this discussion";
const EXPANDED = "Expanded this discussion";

const badgeClassList = (open: boolean) => {
  const classNames = "token-btn discussion-badge";
  return open ? `${classNames} is-open` : classNames;
};

export const CodeDiscussionView: React.FC<CodeDiscussionViewProps> = ({
  question,
  toggleDiscussion,
  showDiscussion,
  lineNum,
}) => {
  const { owner } = useContext(PostContext);
  const [showReply, setShowReply] = useState(false);

  return (
    <>
      <button
        className={badgeClassList(showDiscussion)}
        title={showDiscussion ? COLLAPSE : EXPANDED}
        onClick={() => {
          setShowReply(false);
          toggleDiscussion();
        }}
      >
        <span className="badge-counter">{question.numReplies}</span>
        <span className="badge-icon">▾</span>
      </button>
      {showDiscussion && (
        <DiscussionContainer
          className="inner-animate-box is-open"
          showReply={showReply}
        >
          <DiscussionNavBar>
            <h2 className="header-title">
              <span className="discussion-title">{question.title}</span>
            </h2>
            <span className="header-sub-title">{question.lineNum}</span>
          </DiscussionNavBar>
          {[question, ...question.replies].map((reply, key) => {
            return (
              <CommentCard
                {...reply}
                isOwner={reply.creator.id === owner}
                key={key}
                onReplyClick={() => setShowReply(true)}
              />
            );
          })}
        </DiscussionContainer>
      )}
      {showReply && (
        <CreateQuestionReply
          view="code-view"
          onEditorSubmit={() => setShowReply(false)}
          lineNum={lineNum}
          questionId={question!.id}
        />
      )}
    </>
  );
};
