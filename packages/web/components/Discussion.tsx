import React, { useCallback, useEffect, useRef, useState } from "react";
import { CommentProps, CommentBox } from "./commentUI";
import { styled } from "@codeponder/ui";
import { useTransitionend } from "./useAnimateOpen";

interface DiscussionProps {
  comments: CommentProps[];
  onOpenEditor: (props: any) => any;
  showEditor: boolean;
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
  border-bottom: ${(p: { showEditor: boolean }) =>
    p.showEditor ? "none" : "1px solid #dfe2e5"};
  margin-bottom: ${p => (p.showEditor ? "-0.5em" : "0")};
`;

const COLLAPSE = "Collapse this discussion";
const EXPANDED = "Expanded this discussion";

const lineNumbers = (comment: CommentProps) => {
  const { startingLineNum, endingLineNum } = comment;
  if (startingLineNum == endingLineNum) {
    return `Line ${startingLineNum}`;
  }
  return `Lines ${startingLineNum} - ${endingLineNum}`;
};

export const Discussion: React.FC<DiscussionProps> = ({
  comments,
  onOpenEditor,
  showEditor,
}) => {
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const discussionRef = useRef<HTMLDivElement>(null);
  const newQuestionRef = useRef(
    comments.length == 1 && comments[0].newQuestion
  );

  const [showDiscussion, setShowDiscussion] = useState(false);
  const discussionOpen = useTransitionend(discussionRef, showDiscussion, false);

  const onToggleDiscussion = useCallback(({ target: elm }: any = {}) => {
    elm && elm.classList.toggle("is-open");
    setShowDiscussion(val => !val);
  }, []);

  // show new question immediately
  useEffect(
    () => {
      if (newQuestionRef.current) {
        newQuestionRef.current = false;
        onToggleDiscussion({ target: toggleButtonRef.current });
      }
    },
    [comments]
  );

  return (
    <>
      <button
        ref={toggleButtonRef}
        className="token-btn discussion-badge"
        title={showDiscussion ? COLLAPSE : EXPANDED}
        onClick={onToggleDiscussion}
      >
        <span className="badge-counter">{comments.length}</span>
        <span className="badge-icon">▾</span>
      </button>
      {(showDiscussion || discussionOpen) && (
        <DiscussionContainer
          ref={discussionRef}
          showEditor={showEditor}
          className={`inner-animate-box${discussionOpen ? " is-open" : ""}`}
        >
          <DiscussionNavBar>
            <h2 className="header-title">
              <span className="discussion-title">Title placeholder</span>{" "}
              <span className="header-sub-title">#???</span>
            </h2>
            <span className="header-sub-title">{lineNumbers(comments[0])}</span>
          </DiscussionNavBar>
          {comments.map((comment, key) => {
            return <CommentBox {...{ ...comment, key, onOpenEditor }} />;
          })}
        </DiscussionContainer>
      )}
    </>
  );
};
