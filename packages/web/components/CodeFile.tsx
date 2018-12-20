import { useRef } from "react";
import * as Prism from "prismjs";
import { Spinner } from "@codeponder/ui";
import "prismjs/themes/prism.css";
import "prismjs/themes/prism-coy.css";
import "./../lib/line-numbers/prism-line-numbers.css";
import "./../lib/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-highlight/prism-line-highlight.css";
import "prismjs/plugins/line-highlight/prism-line-highlight.js";

import {
  CreateCodeReviewQuestionComponent,
  FindCodeReviewQuestionsComponent,
} from "./apollo-components";
import { QuestionReply } from "./QuestionReply";
import { useInputValue } from "../utils/useInputValue";
import { filenameToLang } from "../utils/filenameToLang";
import { loadLanguage } from "../utils/loadLanguage";

interface Props {
  code: string | null;
  path?: string;
  postId: string;
}

export const CodeFile: React.SFC<Props> = ({ code, path, postId }) => {
  const [startingLineNum, startingLineNumChange] = useInputValue("0");
  const [endingLineNum, endingLineNumChange] = useInputValue("0");
  const [text, textChange] = useInputValue("");
  const hasLoadedLanguage = useRef(false);

  const lang = path ? filenameToLang(path) : "";

  return (
    <FindCodeReviewQuestionsComponent
      variables={{
        path,
        postId,
      }}
    >
      {({ data, loading }) => {
        if (!data || loading) {
          return <Spinner size={3} />;
        }

        const dataLines = data.findCodeReviewQuestions.map(q => {
          return `${q.startingLineNum}-${q.endingLineNum}`;
        });

        return (
          <CreateCodeReviewQuestionComponent>
            {mutate => (
              <>
                <pre
                  ref={async () => {
                    if (!hasLoadedLanguage.current) {
                      try {
                        await loadLanguage(lang);
                      } catch {}

                      /***************************************************
                       * Pass the callback to get access to the event
                       ****************************************************/
                      Prism.plugins.lineNumbers.setCallback((event: any) => {
                        console.log(
                          "codeFile callback: ",
                          event.target.innerHTML
                        );
                      });

                      Prism.highlightAll();

                      hasLoadedLanguage.current = true;
                    }
                  }}
                  className="line-numbers"
                  data-line={dataLines.join(" ")}
                >
                  <code className={`language-${lang}`}>{code}</code>
                </pre>
                <form
                  onSubmit={async e => {
                    e.preventDefault();
                    const start = parseInt(startingLineNum, 10);
                    const end = parseInt(endingLineNum, 10);
                    const response = await mutate({
                      variables: {
                        codeReviewQuestion: {
                          startingLineNum: start,
                          endingLineNum: end,
                          codeSnippet: (code || "")
                            .split("\n")
                            .slice(start - 1, end)
                            .join("\n"),
                          text: text,
                          path,
                          postId,
                          programmingLanguage: lang,
                        },
                      },
                    });

                    console.log(response);
                  }}
                >
                  <input
                    name="startingLineNum"
                    placeholder="startingLineNum"
                    value={startingLineNum}
                    onChange={startingLineNumChange}
                  />
                  <input
                    name="endingLineNum"
                    placeholder="endingLineNum"
                    value={endingLineNum}
                    onChange={endingLineNumChange}
                  />
                  <input
                    name="question"
                    placeholder="question"
                    value={text}
                    onChange={textChange}
                  />
                  <button type="submit">save</button>
                </form>
                <div>
                  {data.findCodeReviewQuestions.map(crq => (
                    <div key={crq.id}>
                      <div>|{crq.creator.username}|</div>
                      <div>{crq.text}</div>
                      {crq.replies.map(reply => (
                        <div key={reply.id} style={{ color: "pink" }}>
                          <div>${reply.creator.username}$</div>
                          {reply.text}
                        </div>
                      ))}
                      <QuestionReply questionId={crq.id} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </CreateCodeReviewQuestionComponent>
        );
      }}
    </FindCodeReviewQuestionsComponent>
  );
};
