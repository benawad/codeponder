import { memo, useState } from "react";
import { CodeReviewQuestionInfoFragment } from "../../../../generated/apollo-components";
import { AddComment } from "./CommentSection";
import { CodeDiscussionView } from "./Discussion";

interface RenderLineProps {
  question?: CodeReviewQuestionInfoFragment;
  line: string;
  lineNum: number;
}

export const RenderLine: React.FC<RenderLineProps> = memo(
  ({ question, line, lineNum }) => {
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
        {question && (
          <CodeDiscussionView
            question={question}
            toggleEditor={() => setShowEditor(!showEditor)}
            showEditor={showEditor}
          />
        )}
        {showEditor && (
          <AddComment
            question={question}
            lineNum={lineNum}
            setShowEditor={setShowEditor}
            view="code-view"
          />
        )}
      </div>
    );
  }
);
