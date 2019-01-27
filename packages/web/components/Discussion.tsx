import { CommentCard, styled } from "@codeponder/ui";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { CommentProps, QuestionProps } from "../types/questionReplyTypes";

interface CodeDiscussionViewProps {
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

const lineNumbers = (comment: QuestionProps) => {
  const { startingLineNum, endingLineNum } = comment;
  if (startingLineNum == endingLineNum) {
    return `Line ${startingLineNum}`;
  }
  return `Lines ${startingLineNum} - ${endingLineNum}`;
};

export const CodeDiscussionView: React.FC<CodeDiscussionViewProps> = ({
  comments,
  onOpenEditor,
  showEditor,
}) => {
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const discussionRef = useRef<HTMLDivElement>(null);
  const newQuestionRef = useRef(false);
  const [showDiscussion, setShowDiscussion] = useState(false);

  const onToggleDiscussion = useCallback(
    ({ target: elm }: any = {}) => {
      elm && elm.classList.toggle("is-open");
      if (showDiscussion) {
        newQuestionRef.current = false;
        discussionRef.current!.style.maxHeight = "2000px";
        discussionRef.current!.classList.remove("is-open");
        setTimeout(() => {
          setShowDiscussion(false);
        }, 200);
      } else {
        setShowDiscussion(true);
      }
    },
    [showDiscussion]
  );

  // show new question immediately
  useEffect(() => {
    if (comments.length == 1 && comments[0].newComment) {
      newQuestionRef.current = true;
      onToggleDiscussion({ target: toggleButtonRef.current });
    }
  }, []);

  return (
    <>
      <button
        ref={toggleButtonRef}
        className="token-btn discussion-badge"
        title={showDiscussion ? COLLAPSE : EXPANDED}
        onClick={onToggleDiscussion}
      >
        <span className="badge-counter">{comments.length - 1}</span>
        <span className="badge-icon">▾</span>
      </button>
      {showDiscussion && (
        <Discussion
          discussionRef={discussionRef}
          className={`inner-animate-box${
            newQuestionRef.current ? " is-open" : ""
          }`}
          comments={comments}
          onOpenEditor={onOpenEditor}
          showEditor={showEditor}
          animate={true}
        />
      )}
    </>
  );
};

interface DiscussionProps extends CodeDiscussionViewProps {
  discussionRef: React.RefObject<HTMLDivElement>;
  className: string;
  animate?: boolean;
}

export const Discussion: React.FC<DiscussionProps> = ({
  discussionRef,
  className,
  comments,
  onOpenEditor,
  showEditor,
  animate,
}) => {
  useEffect(
    () => {
      if (animate) {
        discussionRef.current!.classList.add("is-open");
      }
    },
    [showEditor]
  );

  useEffect(() => {
    setTimeout(() => {
      discussionRef.current!.style.maxHeight = "none";
    }, 200);
  }, []);

  return (
    <DiscussionContainer
      ref={discussionRef}
      className={className}
      showEditor={showEditor}
    >
      <DiscussionNavBar>
        <h2 className="header-title">
          <span className="discussion-title">Title placeholder</span>{" "}
          <span className="header-sub-title">#???</span>
        </h2>
        <span className="header-sub-title">
          {lineNumbers(comments[0] as QuestionProps)}
        </span>
      </DiscussionNavBar>
      {comments.map((comment, key) => {
        return <CommentCard {...{ ...comment, key, onOpenEditor }} />;
      })}
    </DiscussionContainer>
  );
};
