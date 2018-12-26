import * as React from "react";
import { ChangeEvent } from "react";

import { CreateCodeReviewQuestionComponent } from "./apollo-components";
import { useInputValue } from "../utils/useInputValue";

export interface QuestionFormProps {
  code?: string;
  path?: string;
  postId: string;
  programmingLanguage?: string;
  startLinesSelection: number;
  endLinesSelection: number;
  handleStartLinesSelection: (event: ChangeEvent<HTMLInputElement>) => void;
  handleEndLinesSelection: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const QuestionForm = ({
  code,
  path,
  postId,
  programmingLanguage,
  startLinesSelection,
  endLinesSelection,
  handleStartLinesSelection,
  handleEndLinesSelection,
}: QuestionFormProps) => {
  const [text, textChange] = useInputValue("");

  return (
    <CreateCodeReviewQuestionComponent>
      {mutate => (
        <form
          onSubmit={async e => {
            e.preventDefault();
            const start = startLinesSelection;
            const end = endLinesSelection;
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
            value={startLinesSelection.toString()}
            onChange={handleStartLinesSelection}
          />
          <input
            name="endingLineNum"
            placeholder="endingLineNum"
            value={endLinesSelection.toString()}
            onChange={handleEndLinesSelection}
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
