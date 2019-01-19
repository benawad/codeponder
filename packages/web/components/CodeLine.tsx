import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { CodeDiscussionView } from "./Discussion";
import { AddComment } from "./CommentSection";
import { CommentProps, EditorSubmitProps } from "../types/questionReplyTypes";
import { PostContext } from "./PostContext";
import { getScrollY } from "../utils/domScrollUtils";

interface RenderLineProps {
  comments: CommentProps[];
  line: string;
  lineNum: number;
}

// prevent page scroll after submitting comment form
const preventScroll = (): (() => void) => {
  const scrollPosition = getScrollY();
  const stopScroll = (event: UIEvent): void => {
    event.preventDefault();
    window.scrollTo(0, scrollPosition);
  };
  window.addEventListener("scroll", stopScroll);
  return () => {
    window.removeEventListener("scroll", stopScroll);
  };
};

export const RenderLine: React.FC<RenderLineProps> = ({
  comments,
  line,
  lineNum,
}) => {
  const { owner } = useContext(PostContext);
  const preventScrollRef = useRef<(() => void) | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [commentsForRow, setCommentsForRow] = useState(comments || []);

  const onEditorSubmit = useCallback(
    ({ submitted, response }: EditorSubmitProps) => {
      if (submitted && response) {
        const data = {
          ...response,
          isOwner: response.creator.username == owner,
          newComment: true,
        };
        preventScrollRef.current = preventScroll();
        setCommentsForRow([...commentsForRow, data]);
        setShowEditor(false);
      } else {
        // wait until close animation is finished
        setTimeout(() => setShowEditor(false), 400);
      }
    },
    [commentsForRow]
  );

  useEffect(
    () => {
      if (typeof preventScrollRef.current == "function") {
        preventScrollRef.current();
        preventScrollRef.current = null;
      }
    },
    [commentsForRow]
  );

  const onOpenEditor = useCallback(
    () => {
      if (!showEditor) {
        setShowEditor(true);
      }
    },
    [showEditor]
  );

  return (
    <div key={lineNum} className="token-line">
      <span
        className="token-html"
        data-line-number={lineNum}
        dangerouslySetInnerHTML={{ __html: line }}
        onClick={onOpenEditor}
      />
      {commentsForRow.length > 0 && (
        <CodeDiscussionView
          comments={commentsForRow}
          onOpenEditor={onOpenEditor}
          showEditor={showEditor}
        />
      )}
      {showEditor && (
        <AddComment
          comments={commentsForRow}
          line={lineNum}
          onEditorSubmit={onEditorSubmit}
          view="code-view"
        />
      )}
    </div>
  );
};
