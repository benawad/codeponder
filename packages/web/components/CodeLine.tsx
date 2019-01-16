import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { CodeDiscussionView } from "./Discussion";
import { AddComment } from "./CommentSection";
import { CommentProps } from "../types/questionReplyTypes";
import { CodeFileContext } from "./CodeFileContext";
import { getScrollY } from "../utils/domScrollUtils";
import { useTransitionend } from "./useAnimateOpen";
import {
  CodeReviewQuestionInfoFragment,
  QuestionReplyInfoFragment,
} from "./apollo-components";

interface EditorSubmitProps {
  submitted: boolean;
  response?: CodeReviewQuestionInfoFragment | QuestionReplyInfoFragment;
}

interface RenderLineProps {
  comments: CommentProps[];
  line: string;
  lineNum: number;
}

export const RenderLine: React.FC<RenderLineProps> = ({
  comments,
  line,
  lineNum,
}) => {
  const { owner } = useContext(CodeFileContext);
  const formRef = useRef<HTMLDivElement>(null);
  const [showEditor, setShowEditor] = useState(false);
  const editorOpen = useTransitionend(formRef, showEditor, false);
  const [commentsForRow, setCommentsForRow] = useState(comments || []);

  let preventScroll = false;
  let scrollPosition = getScrollY();
  const onEditorSubmit = useCallback(
    ({ submitted, response }: EditorSubmitProps) => {
      if (submitted && response) {
        const data = {
          ...response,
          isOwner: response.creator.username == owner,
          newComment: true,
        };
        preventScroll = true;
        scrollPosition = getScrollY();
        setCommentsForRow([...commentsForRow, data]);
      }
      setShowEditor(false);
    },
    [commentsForRow]
  );

  useEffect(
    () => {
      preventScroll = false;
    },
    [commentsForRow]
  );

  useEffect(() => {
    // prevent page scroll after submitting comment form
    const stopScroll = (event: UIEvent): void => {
      if (preventScroll) {
        event.preventDefault();
        window.scrollTo(0, scrollPosition);
      }
    };
    window.addEventListener("scroll", stopScroll);
    return () => {
      window.removeEventListener("scroll", stopScroll);
    };
  }, []);

  const onOpenEditor = useCallback(
    ({ target: elm }: any) => {
      if (
        !showEditor &&
        ((elm.classList.contains("btn-open-edit") &&
          elm.parentNode.parentNode.classList.contains("is-hovered")) ||
          elm.classList.contains("btn-reply"))
      ) {
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
          showEditor={showEditor || editorOpen}
        />
      )}
      {(showEditor || editorOpen) && (
        <div ref={formRef} className="inner-animate-box">
          <AddComment
            comments={commentsForRow}
            line={lineNum}
            onEditorSubmit={onEditorSubmit}
          />
        </div>
      )}
    </div>
  );
};
