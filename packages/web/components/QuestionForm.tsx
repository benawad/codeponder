import * as React from "react";
import { useEffect } from "react";

import { CreateCodeReviewQuestionComponent } from "./apollo-components";
import { useInputValue } from "../utils/useInputValue";

export interface QuestionFormProps {
  code?: string;
  path?: string;
  postId: string;
  programmingLanguage?: string;
  linesSelection: number[];
}

export const QuestionForm = ({
  code,
  path,
  postId,
  programmingLanguage,
  linesSelection,
}: QuestionFormProps) => {
  const [startingLineNum, setStartingLineNum] = useInputValue("0");
  const [endingLineNum, setEndingLineNum] = useInputValue("0");
  const [text, textChange] = useInputValue("");

  useEffect(
    () => {
      // Used local constant
      // but the values may be passed directly with the || ?
      const startLinesSelection = linesSelection ? linesSelection[0] || 0 : 0;
      const endLinesSelection = linesSelection ? linesSelection[1] || 0 : 0;

      setStartingLineNum(startLinesSelection);
      setEndingLineNum(endLinesSelection);
    },
    [linesSelection]
  );

  return (
    <CreateCodeReviewQuestionComponent>
      {mutate => (
        <form
          onSubmit={async e => {
            e.preventDefault();
            const start = parseInt(startingLineNum, 10);
            const end = parseInt(endingLineNum, 10);
            const response = await mutate({
              variables: {
                codeReviewQuestion: {
                  startingLineNum: start,
                  endingLineNum: end,
                  codeSnippet: !code
                    ? null
                    : code
                        .split("\n")
                        .slice(start - 1, end)
                        .join("\n"),
                  text: text,
                  path,
                  postId,
                  programmingLanguage,
                },
              },
            });

            //console.log(response);
          }}
        >
          <input
            name="startingLineNum"
            placeholder="startingLineNum"
            value={startingLineNum}
            onChange={setStartingLineNum}
          />
          <input
            name="endingLineNum"
            placeholder="endingLineNum"
            value={endingLineNum}
            onChange={setEndingLineNum}
          />
          <input
            name="question"
            placeholder="question"
            value={text}
            onChange={textChange}
          />
          <button type="submit">save</button>
        </form>
      )}
    </CreateCodeReviewQuestionComponent>
  );
};
