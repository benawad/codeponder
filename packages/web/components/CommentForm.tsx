import React, { useCallback, useContext, useRef, useEffect } from "react";

import { useSelectedLines, cleanSelectedLines } from "./useSelectedLines";
import { useInputValue } from "../utils/useInputValue";
import { isScrolledIntoView, getScrollY } from "../utils/domScrollUtils";
import { MyButton, styled, Label, BlueInput } from "@codeponder/ui";
import { CommentBoxContainer } from "./commentUI";
import { CodeFileContext } from "./CodeFileContext";

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

  /* hide spinners on number input field */
  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const FormRow = styled.div`
  padding: 1rem 0.5em;
`;

const Separator = styled.div`
  width: 100%
  height: 1;
  background: #f2f2f2;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.625em;

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
  isReplay: boolean;
  startingLineNum?: number;
  endingLineNum: number;
  submitForm: (props: TextEditorResult) => Promise<void>;
  type: "reply" | "question";
  view: "in-code" | "in-tree";
}

export interface TextEditorResult {
  cancel: boolean;
  startingLineNum: number;
  endingLineNum: number;
  title: string;
  text: string;
}

export const TextEditor = (props: TextEditorProps) => {
  const {
    isReplay,
    startingLineNum,
    endingLineNum,
    submitForm,
    type,
    view,
  } = props;

  const formRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, titleChange] = useInputValue("");
  const [text, textChange] = useInputValue("");
  const { totalLines } = useContext(CodeFileContext);

  // listening to mouse move when start input is focused
  // Styles lines between start - end when start change
  const [
    { start, startingLineNumChange, startInput },
    { end, endingLineNumChange, endInput },
  ] = useSelectedLines(startingLineNum, endingLineNum, view);

  // validate fields
  const titleTrimmed = (() => title.trim())();
  const textTrimmed = (() => text.trim())();
  const validateStartEnd =
    !startInput.current ||
    !endInput.current ||
    (startInput.current!.validity.valid && endInput.current!.validity.valid);
  const isValidForm = isReplay
    ? textTrimmed
    : titleTrimmed && textTrimmed && validateStartEnd;

  // focus title / textarea
  useEffect(() => {
    if (inputRef) {
      inputRef.current!.focus();
    }
  }, []);

  // make sure the editor is fully visible
  useEffect(() => {
    if (view == "in-code") {
      const elm = formRef.current!.parentElement!.parentElement;
      const { offsetBottom = 0 } = isScrolledIntoView(elm);
      if (offsetBottom > 0) {
        window.scrollTo(0, getScrollY() + offsetBottom + 50);
      }
    }
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
    cleanSelectedLines();
    submitForm({ cancel: true } as TextEditorResult);
  }, []);

  return (
    <CommentBoxContainer>
      <FormContainer ref={formRef} onKeyDown={onKeyDown}>
        {// hide title and line numbers on reply
        !isReplay && (
          <>
            <FormRow>
              <FormInput
                ref={inputRef}
                placeholder="Title"
                name="title"
                value={title}
                onChange={titleChange}
              />
            </FormRow>
            <FormRow>
              <Label style={{ paddingBottom: ".4rem" }}>Line numbers</Label>
              <FormInput
                className="start-tooltip"
                ref={startInput}
                name="startingLineNum"
                min="1"
                max={Math.min(endingLineNum, totalLines)}
                type="number"
                value={start}
                width="5em"
                onChange={startingLineNumChange}
              />
              <Label className="tooltiptext" as="span">
                You can type a number, use up/down arrows or select a line with
                the mouse
              </Label>
              <span style={{ padding: "0px 1rem" }}>–</span>
              <FormInput
                ref={endInput}
                disabled={view == "in-code"}
                name="endingLineNum"
                min={Math.min(start, totalLines)}
                max={totalLines}
                type="number"
                value={end}
                width="5em"
                onChange={endingLineNumChange}
              />
            </FormRow>
            <Separator />
          </>
        )}

        <FormRow>
          <FormInput
            ref={isReplay ? inputRef : null}
            minHeight="100px"
            name="question"
            placeholder={
              type == "reply" ? "Type your Reply" : "Type your Question"
            }
            value={text}
            onChange={textChange}
            as="textarea"
          />
        </FormRow>
        <Separator />
        <div className="btn-box">
          <MyButton variant="form" className="btn" onClick={onCancel}>
            Cancel
          </MyButton>
          <MyButton
            variant="form"
            disabled={!isValidForm}
            className={`primary ${isValidForm ? "" : "disabled"}`}
            onClick={() => {
              if (isValidForm) {
                submitForm({
                  cancel: false,
                  startingLineNum: start,
                  endingLineNum: end,
                  title: titleTrimmed,
                  text: textTrimmed,
                });
              }
            }}
          >
            Save
          </MyButton>
        </div>
      </FormContainer>
    </CommentBoxContainer>
  );
};
