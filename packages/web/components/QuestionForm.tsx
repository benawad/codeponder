import * as React from "react";

import { CreateCodeReviewQuestionComponent } from "./apollo-components";
import { useInputValue } from "../utils/useInputValue";

export interface QuestionFormProps {
  code?: string;
  path?: string;
  postId: string;
  programmingLanguage?: string;
}

export const QuestionForm = ({
  code,
  path,
  postId,
  programmingLanguage,
}: QuestionFormProps) => {
  const [startingLineNum, startingLineNumChange] = useInputValue("0");
  const [endingLineNum, endingLineNumChange] = useInputValue("0");
  const [text, textChange] = useInputValue("");

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

            console.log(response);
          }}
        >
          <input
            name="startingLineNum"
            placeholder="startingLineNum"
            value={startingLineNum}
            onChange={startingLineNumChange}
          />
          <input
            name="endingLineNum"
            placeholder="endingLineNum"
            value={endingLineNum}
            onChange={endingLineNumChange}
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
