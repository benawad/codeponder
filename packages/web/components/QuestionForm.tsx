import React, { useContext } from "react";
import { BlueInput, MyButton, Label, styled } from "@codeponder/ui";
import { DebounceInput } from "react-debounce-input";

import { CreateCodeReviewQuestionComponent } from "./apollo-components";
import { useInputValue } from "../utils/useInputValue";
import { TextEditor, TextEditorResult } from "./CommentForm";
import { CodeFileContext } from "./CodeFileContext";

export interface QuestionFormProps {
  code?: string;
  path?: string;
  postId: string;
  programmingLanguage?: string;
  startLinesSelection: number;
  endLinesSelection: number;
  handleLinesSelection: (event: any, inputNumber: number) => void;
}

const FormRow = styled.div`
  padding: 1rem 2rem;
`;

export const QuestionForm = ({
  code,
  path,
  postId,
  programmingLanguage,
  startLinesSelection,
  endLinesSelection,
  handleLinesSelection,
}: QuestionFormProps) => {
  const [text, textChange] = useInputValue("");

  return (
    <CreateCodeReviewQuestionComponent>
      {mutate => (
        <form
          style={{
            background: "#FFFFFF",
            border: "1px solid #F2F2F2",
            borderRadius: "5px",
          }}
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

            console.log(response);
          }}
        >
          {/* see https://www.npmjs.com/package/react-debounce-input */}
          <FormRow>
            <Label style={{ paddingBottom: ".4rem" }}>Line numbers</Label>
            <DebounceInput
              name="startingLineNum"
              placeholder="0"
              value={startLinesSelection}
              debounceTimeout={300}
              element={BlueInput}
              style={{ width: 33 }}
              onChange={ev => handleLinesSelection(ev, 0)}
            />
            <span style={{ padding: "0px 1rem" }}>–</span>
            <DebounceInput
              name="endingLineNum"
              placeholder="0"
              value={endLinesSelection}
              debounceTimeout={300}
              element={BlueInput}
              style={{ width: 33 }}
              onChange={ev => handleLinesSelection(ev, 1)}
            />
          </FormRow>
          <div
            style={{
              width: "100%",
              height: 1,
              background: "#F2F2F2",
            }}
          />
          <FormRow>
            <Label style={{ paddingBottom: ".4rem" }}>Question</Label>
            <BlueInput
              name="question"
              placeholder="question"
              value={text}
              onChange={textChange}
              style={{ width: "100%", minHeight: 85 }}
              as="textarea"
            />
          </FormRow>
          <div
            style={{
              width: "100%",
              height: 1,
              background: "#F2F2F2",
            }}
          />
          <div style={{ padding: "1rem", display: "flex" }}>
            <MyButton
              style={{ marginLeft: "auto" }}
              variant="primary"
              type="submit"
            >
              save
            </MyButton>
          </div>
        </form>
      )}
    </CreateCodeReviewQuestionComponent>
  );
};

export interface QuestionProps {
  onEditorSubmit: (T?: any) => void;
  isReplay: boolean;
  startingLineNum?: number; // not exist before the first comment created
  endingLineNum: number;
}

// TODO: fix type definition
export const CreateQuestion = ({ onEditorSubmit, ...props }: QuestionProps) => {
  const { code, path, postId, lang } = useContext(CodeFileContext);
  return (
    <CreateCodeReviewQuestionComponent>
      {mutate => {
        const submitForm = async ({
          cancel,
          startingLineNum,
          endingLineNum,
          text,
        }: TextEditorResult) => {
          if (!cancel) {
            // save result
            const codeReviewQuestion = {
              startingLineNum,
              endingLineNum,
              codeSnippet: !code
                ? null
                : code
                    .split("\n")
                    .slice(startingLineNum - 1, endingLineNum)
                    .join("\n"),
              text: text,
              path,
              postId,
              programmingLanguage: lang,
            };
            const response = await mutate({
              variables: {
                codeReviewQuestion,
              },
            });

            console.log(response);

            onEditorSubmit({
              submitted: true,
              response,
              data: { type: "question", ...codeReviewQuestion },
            });
          } else {
            onEditorSubmit({ submitted: false });
          }
        };
        return (
          <TextEditor
            {...{ ...props, submitForm, type: "question", view: "in-code" }}
          />
        );
      }}
    </CreateCodeReviewQuestionComponent>
  );
};
