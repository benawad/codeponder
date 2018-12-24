import { useState } from "react";
//import * as Prism from "prismjs";
//import "prismjs/themes/prism.css";
import "prismjs/themes/prism-coy.css";

import styled, { css } from "styled-components";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
//import theme from "prism-react-renderer/themes/vsDarkPlus";

import {
  FindCodeReviewQuestionsComponent,
  FindCodeReviewQuestionsQuery,
} from "./apollo-components";
import { filenameToLang } from "../utils/filenameToLang";
import { QuestionSection } from "./QuestionSection";

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
  const [lineSelectionState, setLineSelectionState] = useState<number[]>([]);
  const lang: Language = path ? filenameToLang(path) : "";
  const variables = {
    path,
    postId,
  };

  /*
   * Handler to manage the array of selected lines
   * It simulates the github line number selection
   *  */
  const handleSelectLine = (lineNumber: number) => {
    let tempSelectionState = [...lineSelectionState];

    const lineExist = tempSelectionState
      .filter(value => {
        return value !== lineNumber;
      })
      .sort((a, b) => a - b);

    // so many if else are not so legible...
    // a switch might be possible here, but does it bring more or less?
    if (tempSelectionState.length == 0) {
      tempSelectionState.push(lineNumber);
    } else if (lineExist.length !== tempSelectionState.length) {
      tempSelectionState = [...lineExist];
    } else if (tempSelectionState.length == 2) {
      tempSelectionState[1] = lineNumber;
    } else if (tempSelectionState.length > 0 || tempSelectionState.length < 2) {
      // this is the same as the first condition, but the order is important...
      tempSelectionState.push(lineNumber);
    }

    // The react hook must be outside conditions?
    tempSelectionState.sort((a, b) => a - b);
    setLineSelectionState([...tempSelectionState]);
    return;
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

          /* Style for the effect of alternating colors in the background */
          & .token-line:nth-child(odd) {
            background: #f3faff;
          }

          ${SelectLines(data)};

          ${SelectLinesMouse(lineSelectionState)};
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
              code={code}
              language={lang}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <Pre className={className} style={style}>
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
              /* Added a props to pass the selected lines */
              linesSelection={lineSelectionState}
            />
          </>
        );
      }}
    </FindCodeReviewQuestionsComponent>
  );
};
