import React, { useCallback, useEffect, useRef, useState } from "react";
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

const useAnimateOpen = (initialState: boolean = false) => {
  const Container = styled.div`
    & .inner-animate-box {
      max-height: 0;
      opacity: 0;
      transition: max-height 400ms, opacity 600ms ease;
    }
    &.is-open .inner-animate-box {
      max-height: 2000px;
      opacity: 1;
    }
  `;

  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(initialState);
  const animate = useRef(!initialState);

  const onClick = useCallback(({ target: elm }: any) => {
    elm.classList.toggle("is-open");
    if (ref.current) {
      ref.current!.classList.remove("is-open");
      // remove the component after the transition ends
      setTimeout(() => {
        setIsOpen(false);
      }, 400);
    } else {
      setIsOpen(true);
    }
  }, []);

  useEffect(
    () => {
      if (isOpen) {
        ref.current!.classList.add("is-open");
      }
      animate.current = !isOpen;
    },
    [isOpen]
  );

  const AnimateContainer: React.FC = ({ children }) => (
    <Container ref={ref} className={animate.current ? "" : "is-open"}>
      {children}
    </Container>
  );

  return { AnimateContainer, isOpen, onClick };
};

export const Discussion: React.FC<DiscussionProps> = ({
  comments,
  onOpenEditor,
  showEditor,
}) => {
  const {
    AnimateContainer,
    isOpen: showDiscussion,
    onClick: onToggleDiscussion,
  } = useAnimateOpen(false);

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
        <AnimateContainer>
          <DiscussionContainer showEditor={showEditor}>
            <div className="discussion-inner-box inner-animate-box">
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
        </AnimateContainer>
      )}
    </>
  );
};
