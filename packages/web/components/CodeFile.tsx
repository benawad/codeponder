import { useState } from "react";
//import * as Prism from "prismjs";
//import "prismjs/themes/prism.css";
import "prismjs/themes/prism-coy.css";

import { css, styled } from "@codeponder/ui";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
//import theme from "prism-react-renderer/themes/vsDarkPlus";

import {
  FindCodeReviewQuestionsComponent,
  FindCodeReviewQuestionsQuery,
} from "./apollo-components";
import { filenameToLang } from "../utils/filenameToLang";
import { QuestionSection } from "./QuestionSection";
import { Token } from "prismjs";

interface Props {
  code: string | null;
  path?: string;
  postId: string;
}

/*
 * *Styles for the line numbers coming from the server
 *
 * TODO: Perhaps refactor SelectLinesMouse as a 'sub function' of SelectLines?
 * Or the two in a more general utils?
 */
const SelectLines = (prop: FindCodeReviewQuestionsQuery) => {
  const styles = prop.findCodeReviewQuestions.reduce((total, current) => {
    return (total += `
     & .token-line:nth-child(n+${current.startingLineNum}):nth-child(-n+${
      current.endingLineNum
    }) {
      background-color: #ffffcc;
    }
     `);
  }, "");
  return css`
    ${styles}
  `;
};

/*
 *Styles for the onClick line numbers
 *
 * TODO: Perhaps refactor SelectLinesMouse as a 'sub function' of SelectLines?
 * Or the two in a more general utils?
 */
const SelectLinesMouse = (arg: number[]) => {
  // establishing defaults
  // The lenght of the args array can be variable
  const startLine = arg[0] || 0;
  const endLine = arg[1] || startLine;

  const styles = `
     & .token-line:nth-child(n+${startLine}):nth-child(-n+${endLine}) {
      background-color: #ffddbb;
    }
     `;
  return css`
    ${styles}
  `;
};

export const CodeFile: React.SFC<Props> = ({ code, path, postId }) => {
  // does this needs so many states? Should be simplified more...
  const [lineSelectionState, setLineSelectionState] = useState<number[]>([
    0,
    0,
  ]);
  const [startLinesSelection, setStartLinesSelection] = useState<number>(0);
  const [endLinesSelection, setEndLinesSelection] = useState<number>(0);

  const lang = (path ? filenameToLang(path) : "") as Language;
  const variables = {
    path,
    postId,
  };

  /*
   * Handler to manage the array of selected lines
   * It simulates the github line number selection
   *  */
  const handleSelectLine = (lineNumber: number) => {
    const codeLength = (code || "").split("\n").length;
    if (lineNumber > codeLength) {
      lineNumber = codeLength;
    }
    let tempSelectionState = lineSelectionState.filter(value => {
      return value !== 0;
    });

    const withoutRepeatLines = tempSelectionState.filter(value => {
      return value !== lineNumber;
    });

    // so many else/if are not so legible...
    // a switch might be possible here, but does it bring more or less?
    if (tempSelectionState.length == 0) {
      tempSelectionState = [lineNumber, lineNumber];
    } else if (withoutRepeatLines.length == 0) {
      tempSelectionState = [0, 0];
    } else if (tempSelectionState.length !== withoutRepeatLines.length) {
      tempSelectionState = [withoutRepeatLines[0], withoutRepeatLines[0]];
    } else if (
      tempSelectionState.length == 2 ||
      tempSelectionState.length == 1
    ) {
      tempSelectionState[1] = lineNumber;
    }
    // The react hook must be outside conditions?
    tempSelectionState.sort((a, b) => a - b);
    setStartLinesSelection(tempSelectionState[0] || 0);
    setEndLinesSelection(tempSelectionState[1] || 0);
    setLineSelectionState([...tempSelectionState]);
    return;
  };

  /*
   * TODO: ability to reset the line selections directly from the input
   */
  const handleLinesSelection = (event: any, inputNumber: number) => {
    if (event.target) {
      // TODO: add a better checks
      const codeLength = (code || "").split("\n").length;
      const value: number[] = [];
      /*
       * Check for selections with numbers bigger than the code has lines
       * And check for possible negative numbers
       */
      const maxLines = lineSelectionState.map(value => {
        return codeLength < value ? codeLength : value;
      });
      let tempValue = Math.abs(parseInt(event.target.value, 10));
      tempValue = codeLength > tempValue ? tempValue : codeLength;

      value[inputNumber] = tempValue || maxLines[inputNumber];
      value[1 - inputNumber] = maxLines[1 - inputNumber];
      if (value[0] > value[1]) {
        value[1] = value[0];
      }
      setLineSelectionState([...value]);
      setStartLinesSelection(value[0]);
      setEndLinesSelection(value[1]);
    }
  };

  return (
    <FindCodeReviewQuestionsComponent variables={variables}>
      {({ data, loading }) => {
        if (!data || loading) {
          return null;
        }

        const Pre = styled.pre`
          text-align: left;
          margin: 4em 0;
          padding: 0.5em;

          & .token-line {
            line-height: 1.3em;
            height: 1.3em;
          }

          /* Style for the effect of alternating colors in the background
          & .token-line:nth-child(odd) {
            background: #f3faff;
          }
          */

          ${SelectLines(data)}

          ${SelectLinesMouse(lineSelectionState)}
        `;

        /* Style for the line numbers */
        const LineNo = styled.span`
          display: inline-block;
          width: 2em;
          user-select: none;
          opacity: 0.3;
          &:hover {
            font-weight: 900;
            opacity: 0.4;
            cursor: pointer;
          }
        `;

        return (
          <>
            <Highlight
              {...defaultProps}
              theme={undefined}
              code={code || ""}
              language={lang}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <Pre
                  className={className}
                  style={{ ...style, overflowX: "auto" }}
                >
                  {tokens.map((line, i) => {
                    return (
                      <div {...getLineProps({ line, key: i })}>
                        <LineNo onClick={() => handleSelectLine(i + 1)}>
                          {i + 1}
                        </LineNo>
                        {line.map((token, key) => {
                          return <span {...getTokenProps({ token, key })} />;
                        })}
                      </div>
                    );
                  })}
                </Pre>
              )}
            </Highlight>
            <QuestionSection
              variables={variables}
              code={code || ""}
              postId={postId}
              programmingLanguage={lang}
              path={path}
              /* Added a props to pass and handle the selected lines */
              startLinesSelection={startLinesSelection}
              endLinesSelection={endLinesSelection}
              handleLinesSelection={handleLinesSelection}
            />
          </>
        );
      }}
    </FindCodeReviewQuestionsComponent>
  );
};
