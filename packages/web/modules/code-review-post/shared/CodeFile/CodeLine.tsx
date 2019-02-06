import { memo, useState } from "react";
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

    return (
      <div key={lineNum} className="token-line">
        <span
          className="token-html"
          data-line-number={lineNum}
          dangerouslySetInnerHTML={{ __html: line }}
          onClick={e => {
            if ((e.target as any).classList.contains("btn-open-edit")) {
              setShowEditor(true);
            }
          }}
        />
        {comments.length > 0 && (
          <CodeDiscussionView
            comments={comments}
            onOpenEditor={() => !showEditor && setShowEditor(true)}
            showEditor={showEditor}
          />
        )}
        {showEditor && (
          <AddComment
            comments={comments}
            lineNum={lineNum}
            setShowEditor={setShowEditor}
            view="code-view"
          />
        )}
      </div>
    );
  }
);
