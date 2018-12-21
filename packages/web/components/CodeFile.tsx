import { useRef } from "react";
import * as Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/themes/prism-coy.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-highlight/prism-line-highlight.css";
import "prismjs/plugins/line-highlight/prism-line-highlight.js";

import { FindCodeReviewQuestionsComponent } from "./apollo-components";
import { filenameToLang } from "../utils/filenameToLang";
import { loadLanguage } from "../utils/loadLanguage";
import { QuestionSection } from "./QuestionSection";

interface Props {
  code: string | null;
  path?: string;
  postId: string;
}

export const CodeFile: React.SFC<Props> = ({ code, path, postId }) => {
  const hasLoadedLanguage = useRef(false);

  const lang = path ? filenameToLang(path) : "";
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
            <pre
              ref={async () => {
                if (!hasLoadedLanguage.current) {
                  try {
                    await loadLanguage(lang);
                  } catch {}
                  Prism.highlightAll();
                  hasLoadedLanguage.current = true;
                }
              }}
              className="line-numbers"
              data-line={dataLines.join(" ")}
            >
              <code className={`language-${lang}`}>{code}</code>
            </pre>
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
