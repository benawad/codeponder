import { memo, useCallback, useState } from "react";
import { CodeDiscussionView } from "./Discussion";
import { AddComment } from "./CommentSection";
import { CommentProps } from "../types/questionReplyTypes";

interface RenderLineProps {
  comments: CommentProps[];
  line: string;
  lineNum: number;
}

export const RenderLine: React.FC<RenderLineProps> = memo(
  ({ comments, line, lineNum }) => {
    const [showEditor, setShowEditor] = useState(false);
    const [commentsForRow, setCommentsForRow] = useState(comments || []);

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
            showEditor={showEditor}
          />
        )}
        {showEditor && (
          <AddComment
            comments={commentsForRow}
            line={lineNum}
            setComments={setCommentsForRow}
            setShowEditor={setShowEditor}
            view="code-view"
          />
        )}
      </div>
    );
  }
);
