import { MyButton } from "@codeponder/ui";
import React, { useCallback, useEffect, useRef } from "react";
import { scrollToView } from "../../../../../utils/domScrollUtils";
import { useInputValue } from "../../../../../utils/useInputValue";
import { FormContainer, FormInput, FormRow, Separator } from "./components";

export interface TextEditorProps {
  isReply: boolean;
  lineNum?: number;
  submitForm: (props: TextEditorResult) => Promise<void>;
  view: "code-view" | "repo-view";
}

export interface TextEditorResult {
  cancel: boolean;
  lineNum?: number;
  title: string;
  text: string;
}

const cleanSelectedLines = (
  lineNum: number,
  parentElm = document.querySelector(".code-content")
) => {
  console.log("cleanSelectedLines", lineNum);
  parentElm!
    .querySelectorAll(`.is-selected-${lineNum}`)
    .forEach(elm => elm.classList.remove(`is-selected-${lineNum}`));
};

const highlightSelectedLines = (
  lineNum: number,
  parentElm = document.querySelector(".code-content")
) => {
  let numberElm: HTMLElement | null =
    parentElm && parentElm.querySelector(`[data-line-number="${lineNum}"]`);
  numberElm &&
    (numberElm.parentNode as HTMLElement).classList.add(
      `is-selected-${lineNum}`
    );
};

export const CommentForm = (props: TextEditorProps) => {
  const { isReply, lineNum, submitForm, view } = props;

  const formRef = useRef<HTMLDivElement>(null);
  const [title, titleChange] = useInputValue("");
  const [text, textChange] = useInputValue("");

  // validate fields
  const titleTrimmed = title.trim();
  const textTrimmed = text.trim();

  const isValidForm = isReply ? textTrimmed : titleTrimmed && textTrimmed;

  useEffect(() => {
    if (lineNum) {
      highlightSelectedLines(lineNum);
    }
  }, []);

  // make sure the editor is fully visible
  useEffect(() => {
    formRef.current!.classList.add("is-open");
    if (view === "code-view" && formRef.current) {
      scrollToView(formRef.current, 200);
    }
  }, []);

  const clearForm = useCallback(() => {
    const value = { currentTarget: { value: "" } };
    titleChange(value);
    textChange(value);
  }, []);

  // close editor with Esc if user did not start editing
  const onKeyDown = useCallback(({ keyCode }: any) => {
    if (keyCode === 27 && !titleTrimmed && !textTrimmed) {
      onCancel();
    }
  }, [titleTrimmed, textTrimmed]);

  const onCancel = useCallback(() => {
    if (view === "repo-view") {
      clearForm();
    } else {
      if (lineNum) {
        cleanSelectedLines(lineNum);
      }
      formRef.current!.classList.remove("is-open");
      submitForm({ cancel: true } as TextEditorResult);
    }
  }, []);

  return (
    <FormContainer
      ref={formRef}
      onKeyDown={onKeyDown}
      isReply={isReply}
      view={view}
      className={`${view === "code-view" ? "inner-animate-box" : ""}`}
    >
      {// show title only for question
      !isReply && (
        <FormRow>
          <FormInput
            placeholder="Title"
            name="title"
            value={title}
            onChange={titleChange}
            autoFocus={!isReply}
          />
        </FormRow>
      )}
      <FormRow>
        <FormInput
          autoFocus={isReply}
          minHeight="100px"
          name="question"
          placeholder={isReply ? "Type your Reply" : "Type your Question"}
          value={text}
          onChange={textChange}
          as="textarea"
        />
      </FormRow>
      <Separator />
      <div className="btn-box">
        {view === "code-view" && (
          <MyButton variant="form" className="btn" onClick={onCancel}>
            Cancel
          </MyButton>
        )}
        <MyButton
          variant="form"
          disabled={!isValidForm}
          className={`primary ${isValidForm ? "" : "disabled"}`}
          onClick={() => {
            if (isValidForm) {
              formRef.current!.classList.remove("is-open");
              submitForm({
                cancel: false,
                lineNum,
                title: titleTrimmed,
                text: textTrimmed,
              });
              if (view === "repo-view") {
                clearForm();
              }
            }
          }}
        >
          Save
        </MyButton>
      </div>
    </FormContainer>
  );
};
