import { useCallback, useEffect, useRef, useState } from "react";
import { CommentProps, CommentBox } from "./commentUI";
import { styled } from "@codeponder/ui";

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

  & .discussion-inner-box {
    border-top: 1px solid #dfe2e5;
    border-bottom: ${(p: { showEditor: boolean }) =>
      p.showEditor ? "none" : "1px solid #dfe2e5"};
    margin-bottom: ${p => (p.showEditor ? "-0.5em" : "0")};
    max-height: 0;
    opacity: 0;
    transition: max-height 400ms, opacity 600ms ease;
  }

  &.is-open > .discussion-inner-box {
    max-height: 2000px;
    opacity: 1;
  }
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
  const discussionRef = useRef<HTMLDivElement>(null);
  const [showDiscussion, setShowDiscussion] = useState(false);

  const onToggleDiscussion = useCallback(({ target: elm }: any) => {
    if (elm.classList.contains("discussion-badge")) {
      elm.classList.toggle("is-open");
      if (discussionRef.current) {
        discussionRef.current!.classList.remove("is-open");
        // remove the component after the transition ends
        setTimeout(() => {
          setShowDiscussion(false);
        }, 400);
      } else {
        setShowDiscussion(true);
      }
    }
  }, []);

  useEffect(
    () => {
      if (showDiscussion) {
        discussionRef.current!.classList.add("is-open");
      }
    },
    [showDiscussion, showEditor]
  );

  return (
    <>
      <button
        className="token-btn discussion-badge"
        title={showDiscussion ? COLLAPSE : EXPANDED}
        onClick={onToggleDiscussion}
      >
        <span className="badge-counter">{comments.length}</span>
        <span className="badge-icon">▾</span>
      </button>
      {showDiscussion && (
        <DiscussionContainer ref={discussionRef} showEditor={showEditor}>
          <div className="discussion-inner-box">
            <DiscussionNavBar>
              <h2 className="header-title">
                <span className="discussion-title">Title placeholder</span>{" "}
                <span className="header-sub-title">#???</span>
              </h2>
              <span className="header-sub-title">
                {lineNumbers(comments[0])}
              </span>
            </DiscussionNavBar>
            {comments.map((comment, key) => {
              return <CommentBox {...{ ...comment, key, onOpenEditor }} />;
            })}
          </div>
        </DiscussionContainer>
      )}
    </>
  );
};
