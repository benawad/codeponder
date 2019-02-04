import { BlueInput, MyButton, styled } from "@codeponder/ui";
import React, { useCallback, useEffect, useRef } from "react";
import { DebounceInput } from "react-debounce-input";
import { scrollToView } from "../utils/domScrollUtils";
import { useInputValue } from "../utils/useInputValue";

interface FormInputProps {
  minHeight?: string;
  width?: string;
}

const FormInput = styled(BlueInput)`
  background: #f2f2f2;
  border: 1px solid transparent;
  font-size: 1em;
  min-height: ${(p: FormInputProps) => p.minHeight};
  padding: 0.6rem 1rem;
  width: ${(p: FormInputProps) => p.width || "100%"};

  &:focus {
    border: 1px solid #2188ff;
    box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075),
      0 0 0 0.2em rgba(3, 102, 214, 0.3);
  }

  /* hide spinners on number input field
  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
  */
`;

const FormRow = styled.div`
  padding: 1rem 0.9rem;
`;

const Separator = styled.div`
  width: 100%
  height: 1;
  background: #f2f2f2;
`;

const FormContainer = styled.div`
  background-color: #ffffff;
  border-top: ${(p: { isReply: boolean; view: string }) =>
    p.isReply ? "none" : "1px solid #d1d5da"};
  border-bottom: ${p => (p.view == "repo-view" ? "none" : "1px solid #d1d5da")};
  display: flex;
  flex-direction: column;
  padding: ${(p: { isReply: boolean }) => (p.isReply ? "0" : "0 0.9rem")};

  &.is-open {
    padding: ${(p: { isReply: boolean }) => (p.isReply ? "0" : "0.9rem")};
  }

  & .btn-box {
    display: flex;
    justify-content: flex-end;
    padding: 0.8em 0.4em;
    & button {
      min-width: 6em;
    }
  }

  /* Tooltip text */
  .start-tooltip + .tooltiptext {
    border-radius: 3px;
    background-color: #f4f6dd;
    font-size: 1em;
    padding: 0.6rem 1rem;
    position: absolute;
    left: 15em;
    text-align: center;
    visibility: hidden;
    z-index: 1;
  }

  .start-tooltip:focus + .tooltiptext {
    visibility: visible;
  }
`;

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

export const TextEditor = (props: TextEditorProps) => {
  const { isReply, lineNum, submitForm, view } = props;

  const formRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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

  // focus title / textarea
  useEffect(() => {
    if (view == "code-view" && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // make sure the editor is fully visible
  useEffect(() => {
    formRef.current!.classList.add("is-open");
    if (view == "code-view" && formRef.current) {
      scrollToView(formRef.current, 200);
    }
  }, []);

  const clearForm = useCallback(() => {
    const value = { currentTarget: { value: "" } };
    titleChange(value);
    textChange(value);
  }, []);

  // close editor with Esc if user did not start editing
  const onKeyDown = useCallback(
    ({ keyCode }: any) => {
      if (keyCode == 27 && !titleTrimmed && !textTrimmed) {
        onCancel();
      }
    },
    [titleTrimmed, textTrimmed]
  );

  const onCancel = useCallback(() => {
    if (view == "repo-view") {
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
      className={`${view == "code-view" ? "inner-animate-box" : ""}`}
    >
      {// show title only for question
      !isReply && (
        <FormRow>
          <DebounceInput
            inputRef={inputRef}
            element={FormInput}
            debounceTimeout={300}
            placeholder="Title"
            name="title"
            value={title}
            onChange={titleChange}
          />
        </FormRow>
      )}
      <FormRow>
        <DebounceInput
          element={FormInput}
          debounceTimeout={300}
          inputRef={isReply ? inputRef : null}
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
        <MyButton variant="form" className="btn" onClick={onCancel}>
          {view == "repo-view" ? "Clear" : "Cancel"}
        </MyButton>
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
              if (view == "repo-view") {
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
