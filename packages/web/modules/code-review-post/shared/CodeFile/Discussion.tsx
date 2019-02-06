import { CommentCard, styled } from "@codeponder/ui";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { CodeReviewQuestionInfoFragment } from "../../../../generated/apollo-components";
import { PostContext } from "../PostContext";

interface CodeDiscussionViewProps {
  question: CodeReviewQuestionInfoFragment;
  toggleEditor: () => void;
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

export const CodeDiscussionView: React.FC<CodeDiscussionViewProps> = ({
  question,
  toggleEditor,
  showEditor,
}) => {
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const discussionRef = useRef<HTMLDivElement>(null);
  const [showDiscussion, setShowDiscussion] = useState(false);

  const onToggleDiscussion = useCallback(() => {
    toggleEditor();
    if (showDiscussion) {
      setShowDiscussion(false);
    } else {
      setShowDiscussion(true);
    }
  }, [showDiscussion]);

  return (
    <>
      <button
        ref={toggleButtonRef}
        className="token-btn discussion-badge"
        title={showDiscussion ? COLLAPSE : EXPANDED}
        onClick={onToggleDiscussion}
      >
        <span className="badge-counter">{question.numReplies}</span>
        <span className="badge-icon">▾</span>
      </button>
      {showDiscussion && (
        <Discussion
          discussionRef={discussionRef}
          className={"inner-animate-box is-open"}
          question={question}
          toggleEditor={toggleEditor}
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
  question,
  toggleEditor,
  showEditor,
  animate,
}) => {
  const { owner } = useContext(PostContext);
  useEffect(() => {
    if (animate) {
      discussionRef.current!.classList.add("is-open");
    }
  }, [showEditor]);

  useEffect(() => {
    const id = setTimeout(() => {
      discussionRef.current!.style.maxHeight = "none";
    }, 200);

    return clearTimeout(id);
  }, []);

  return (
    <DiscussionContainer
      ref={discussionRef}
      className={className}
      showEditor={showEditor}
    >
      <DiscussionNavBar>
        <h2 className="header-title">
          <span className="discussion-title">{question.title}</span>
        </h2>
        <span className="header-sub-title">{question.lineNum}</span>
      </DiscussionNavBar>
      {question.replies.map((reply, key) => {
        return (
          <CommentCard
            {...reply}
            isOwner={reply.creator.id === owner}
            key={key}
            onOpenEditor={toggleEditor}
          />
        );
      })}
    </DiscussionContainer>
  );
};
