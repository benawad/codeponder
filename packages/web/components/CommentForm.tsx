import React, { useRef, useEffect } from "react";

import { useInputValue } from "../utils/useInputValue";
import { isScrolledIntoView, getScrollY } from "../utils/domScrollUtils";
import { MyButton, styled } from "@codeponder/ui";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 0.35em;

  & .code-snippet {
    padding: 0.8em 0;
    border-bottom: 1px solid #999;
  }

  & .code-snippet input {
    margin-left: 0.5em;
    width: 5em;
  }

  & .code-snippet label {
    margin-left: 1em;
  }

  & .form-control {
    border: none;
    display: block;
    max-height: 500px;
    min-height: 100px;
    padding: 8px;
    resize: vertical;
    width: 100%;
    color: #24292e;
    font-size: 16px;
    line-height: 20px;
    min-height: 34px;
    outline: none;
    vertical-align: middle;
    word-wrap: break-word;

    border: 1px solid #d1d5da;
    border-radius: 3px;
    border-color: #2188ff;
    box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075),
      0 0 0 0.35em rgba(3, 102, 214, 0.3);
  }

  & .btn-box {
    border-top: 1px solid #999;
    display: flex;
    justify-content: flex-end;
    padding: 0.8em 0.4em;
    & button {
      min-width: 6em;
    }
  }
`;

export interface TextEditorProps {
  isReplay: boolean;
  startingLineNum?: number;
  endingLineNum: number;
  submitForm: Function;
}

export interface TextEditorResult {
  cancel: boolean;
  startingLineNum: number;
  endingLineNum: number;
  text: string;
}

export const TextEditor = (props: TextEditorProps) => {
  const codeRef = useRef<HTMLDivElement>(null);
  const { isReplay, startingLineNum, endingLineNum, submitForm } = props;
  const [start, startingLineNumChange] = useInputValue(
    String(startingLineNum || endingLineNum)
  );
  const [end, endingLineNumChange] = useInputValue(String(endingLineNum));
  const [text, textChange] = useInputValue("");

  const textTrimmed = (() => text.trim())();

  // make sure the editor is fully visible
  useEffect(() => {
    const elm = codeRef.current!.parentElement!.parentElement;
    const { offsetBottom = 0 } = isScrolledIntoView(elm);
    if (offsetBottom > 0) {
      window.scrollTo(0, getScrollY() + offsetBottom + 50);
    }
  }, []);

  return (
    <Container ref={codeRef}>
      <div className="code-snippet">
        <strong>Code Snippet</strong>
        <label>
          Starting Line:
          <input
            disabled={isReplay}
            name="startingLineNum"
            type="number"
            min="1"
            max={endingLineNum}
            value={start}
            onChange={startingLineNumChange}
          />
        </label>
        <label>
          Ending Line:
          <input
            disabled
            name="endingLineNum"
            type="number"
            value={end}
            onChange={endingLineNumChange}
          />
        </label>
      </div>
      <textarea
        autoFocus
        className="form-control comment-text"
        id="editor"
        name="editor"
        rows={5}
        cols={60}
        placeholder="Leave a comment"
        value={text}
        onChange={textChange}
      />
      <div className="btn-box">
        <MyButton
          variant="form"
          className="btn"
          onClick={() => {
            submitForm({ cancel: true });
          }}
        >
          Cancel
        </MyButton>
        <MyButton
          variant="form"
          {...(textTrimmed ? "" : "disabled")}
          className={`primary ${text ? "" : "disabled"}`}
          onClick={() => {
            if (textTrimmed) {
              submitForm({
                startingLineNum: parseInt(start, 10),
                endingLineNum: parseInt(end, 10),
                text: textTrimmed,
              });
            }
          }}
        >
          Save
        </MyButton>
      </div>
    </Container>
  );
};
