import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Discussion } from "./Discussion";
import { AddComment } from "./CommentSection";
import { CommentProps } from "./commentUI";
import { CodeFileContext } from "./CodeFileContext";
import { getScrollY } from "../utils/domScrollUtils";
import { useAnimateOpen } from "./useAnimateOpen";

interface RenderLineProps {
  comments: CommentProps[];
  line: string;
  lineNum: number;
}

interface RenderLineRef {
  showEditor: boolean;
  preventScroll: boolean;
  scrollPosition: number;
}

export const RenderLine: React.FC<RenderLineProps> = ({
  comments,
  line,
  lineNum,
}) => {
  const { owner } = useContext(CodeFileContext);
  const lineRef = useRef<RenderLineRef>({
    showEditor: false,
    preventScroll: false,
    scrollPosition: getScrollY(),
  });
  const [commentsForRow, setCommentsForRow] = useState(comments || []);

  const {
    AnimateOpen,
    isOpen: showEditor,
    onClick: onToggleShowEditor,
  } = useAnimateOpen(false);

  const setShowEditor = useCallback(val => {
    if (lineRef.current.showEditor != val) {
      lineRef.current.showEditor = val;
      onToggleShowEditor();
    }
  }, []);

  const onEditorSubmit = useCallback(
    ({ submitted, response, data }: any) => {
      if (submitted) {
        const { id, creator, __typename } =
          data.type == "question"
            ? response.data.createCodeReviewQuestion.codeReviewQuestion
            : response.data.createQuestionReply.questionReply;

        data.id = id;
        data.username = creator.username;
        data.isOwner = creator.username == owner;
        data.__typename = __typename;
        lineRef.current.preventScroll = true;
        lineRef.current.scrollPosition = getScrollY();
        data.newQuestion = true;
        setCommentsForRow([...commentsForRow, data]);
      }
      setShowEditor(false);
    },
    [commentsForRow]
  );

  useEffect(
    () => {
      lineRef.current.preventScroll = false;
    },
    [commentsForRow]
  );

  useEffect(() => {
    // prevent page scroll after submitting comment form
    const stopScroll = (event: UIEvent): void => {
      if (lineRef.current.preventScroll) {
        event.preventDefault();
        window.scrollTo(0, lineRef.current.scrollPosition);
      }
    };
    window.addEventListener("scroll", stopScroll);
    return () => {
      window.removeEventListener("scroll", stopScroll);
    };
  }, []);

  const onOpenEditor = useCallback(({ target: elm }: any) => {
    if (
      (elm.classList.contains("btn-open-edit") &&
        elm.parentNode.parentNode.classList.contains("is-hovered")) ||
      elm.classList.contains("btn-reply")
    ) {
      setShowEditor(true);
    }
  }, []);

  return (
    <div key={lineNum} className="token-line">
      <span
        className="token-html"
        data-line-number={lineNum}
        dangerouslySetInnerHTML={{ __html: line }}
        onClick={onOpenEditor}
      />
      {commentsForRow.length > 0 && (
        <Discussion
          comments={commentsForRow}
          onOpenEditor={onOpenEditor}
          showEditor={showEditor}
        />
      )}
      {showEditor && (
        <AnimateOpen bgColor="#ffffff">
          <AddComment
            comments={commentsForRow}
            line={lineNum}
            onEditorSubmit={onEditorSubmit}
          />
        </AnimateOpen>
      )}
    </div>
  );
};
