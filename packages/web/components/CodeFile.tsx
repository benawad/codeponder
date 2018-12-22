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

export const CodeFile: React.SFC<Props> = ({ code, path, postId }) => {
  const lang: Language = path ? filenameToLang(path) : "";
  const variables = {
    path,
    postId,
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

          & .token-line:nth-child(odd) {
            background: #f3faff;
          }

          ${SelectLines(data)};
        `;

        const LineNo = styled.span`
          display: inline-block;
          width: 2em;
          user-select: none;
          opacity: 0.3;
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
                        <LineNo>{i + 1}</LineNo>
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
            />
          </>
        );
      }}
    </FindCodeReviewQuestionsComponent>
  );
};
