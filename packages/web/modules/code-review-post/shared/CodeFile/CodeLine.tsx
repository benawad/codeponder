import { memo, useCallback, useState } from "react";
import { CommentProps } from "../../../../types/questionReplyTypes";
import { AddComment } from "./CommentSection";
import { CodeDiscussionView } from "./Discussion";

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
          elm.classList.contains("btn-open-edit") &&
          elm.parentNode.parentNode.classList.contains("is-hovered")
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
            onOpenEditor={() => !showEditor && setShowEditor(true)}
            showEditor={showEditor}
          />
        )}
        {showEditor && (
          <AddComment
            comments={commentsForRow}
            lineNum={lineNum}
            setComments={setCommentsForRow}
            setShowEditor={setShowEditor}
            view="code-view"
          />
        )}
      </div>
    );
  }
);
