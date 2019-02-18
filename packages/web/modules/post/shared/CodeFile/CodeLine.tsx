import { memo, useState } from "react";
import { QuestionInfoFragment } from "../../../../generated/apollo-components";
import { CreateQuestion } from "../CreateQuestion";
import { CodeDiscussionView } from "./CodeDiscussionView";

interface RenderLineProps {
  question?: QuestionInfoFragment;
  openQuestionId?: string;
  line: string;
  lineNum: number;
}

export const RenderLine: React.FC<RenderLineProps> = memo(
  ({ question, line, lineNum, openQuestionId }) => {
    const [showEditor, setShowEditor] = useState(false);
    const [showDiscussion, setShowDiscussion] = useState(
      !!question && question.id === openQuestionId
    );

    return (
      <div key={lineNum} className="token-line">
        <span
          className="token-html"
          data-line-number={lineNum}
          dangerouslySetInnerHTML={{ __html: line }}
          onClick={e => {
            if ((e.target as any).classList.contains("btn-open-edit")) {
              if (question) {
                setShowDiscussion(true);
              } else {
                setShowEditor(true);
              }
            }
          }}
        />
        {question && (
          <CodeDiscussionView
            question={question}
            toggleDiscussion={() => setShowDiscussion(!showDiscussion)}
            showDiscussion={showDiscussion}
            lineNum={lineNum}
          />
        )}
        {!question && showEditor && (
          <CreateQuestion
            lineNum={lineNum}
            onEditorSubmit={() => {
              setShowEditor(false);
              setShowDiscussion(true);
            }}
            view="code-view"
          />
        )}
      </div>
    );
  }
);
