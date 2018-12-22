//import * as Prism from "prismjs";
//import "prismjs/themes/prism.css";
import "prismjs/themes/prism-coy.css";

import styled from "styled-components";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
//import theme from "prism-react-renderer/themes/vsDarkPlus";

import { FindCodeReviewQuestionsComponent } from "./apollo-components";
import { filenameToLang } from "../utils/filenameToLang";
import { QuestionSection } from "./QuestionSection";

interface Props {
  code: string | null;
  path?: string;
  postId: string;
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
`;

const LineNo = styled.span`
  display: inline-block;
  width: 2em;
  user-select: none;
  opacity: 0.3;
`;

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

        const dataLines = data.findCodeReviewQuestions.map(q => {
          return `${q.startingLineNum}-${q.endingLineNum}`;
        });

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
