import { useRef, useState, useEffect } from "react";
import * as Prism from "prismjs";
import "prismjs/themes/prism-coy.css";
import Highlight from "prism-react-renderer";
import { IconButton, styled, css } from "@codeponder/ui";
import { CommentBox, CommentProps, LineNo } from "./commnetUI";

import {
  FindCodeReviewQuestionsComponent,
  FindCodeReviewQuestionsQuery,
  CodeReviewQuestionInfoFragment,
  QuestionReplyInfoFragment,
} from "./apollo-components";
import { filenameToLang } from "../utils/filenameToLang";
import { loadLanguage } from "../utils/loadLanguage";
import { CreateQuestion, QuestionProps } from "./QuestionForm";
import { CreateQuestionReply, QuestionReply } from "./QuestionReply";

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
      background: hsla(24, 20%, 50%,.08);
      background: linear-gradient(to right, hsla(24, 20%, 50%,.1) 70%, hsla(24, 20%, 50%,0));
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

interface Comments {
  [key: number]: CommentProps[];
}

const getCommentsForFile = (prop: FindCodeReviewQuestionsQuery): Comments => {
  const comment = ({
    id,
    text,
    creator,
    __typename,
  }:
    | CodeReviewQuestionInfoFragment
    | QuestionReplyInfoFragment): CommentProps => ({
    id,
    text,
    username: creator.username,
    isOwner: true, // Todo: need to get real value
    type: (__typename || "").includes("Reply") ? "reply" : "question",
  });

  return prop.findCodeReviewQuestions.reduce((comments: Comments, props) => {
    const startingLineNum = props.startingLineNum;
    const endingLineNum = props.endingLineNum;
    const key = endingLineNum;
    comments[key] = comments[key] || [];
    comments[key].push({
      startingLineNum,
      endingLineNum,
      ...comment(props),
    });
    props.replies.forEach(reply => comments[key].push(comment(reply)));
    return comments;
  }, {});
};

const setIsHovered = (
  { current }: React.RefObject<HTMLElement>,
  { target: elm }: any,
  showButton: boolean
) => {
  while (elm && elm != current && !elm.classList.contains("token-line")) {
    // hide the button when user hover over commets or line-number
    const name = elm.classList[0];
    if (name && name.match(/CommentBoxContainer|LineNo/)) {
      showButton = false;
    }
    elm = elm.parentNode || null;
  }
  if (elm && current) {
    current
      .querySelectorAll(".is-hovered")
      .forEach(button => button.classList.toggle("is-hovered", false));
    if (showButton) {
      elm.childNodes[1].classList.add("is-hovered");
    }
  }
};

interface HighlightProps {
  code: string;
  lang: string;
  data: FindCodeReviewQuestionsQuery;
  postId: string;
  path?: string;
}

const HighlightCode: React.SFC<HighlightProps> = ({
  code,
  lang,
  data,
  postId,
  path,
}) => {
  const hasLoadedLanguage = useRef(false);
  const codeRef = useRef<HTMLElement>(null);
  const [loading, setloading] = useState(true);
  const [showEditor, setShowEditor] = useState(0);

  useEffect(() => {
    if (!hasLoadedLanguage.current) {
      loadLanguage(lang)
        .then(() => {
          setloading(false);
          hasLoadedLanguage.current = true;
        })
        .catch(() => {});
    }
  }, []);

  if (loading) {
    return null;
  }

  const Pre = styled.pre`
    & code[class*="language-"] {
      padding-left: 0;
    }

    ${SelectLines(data)};
  `;

  return (
    <Highlight Prism={Prism} code={code} language={lang}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        const comments = getCommentsForFile(data);
        return (
          <Pre className={className} style={style}>
            <code
              className={`code-content ${className}`}
              ref={codeRef}
              onMouseOut={(e: any): void => {
                setIsHovered(codeRef, e, false);
              }}
              onMouseOver={(e: any): void => {
                setIsHovered(codeRef, e, true);
              }}
            >
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  <LineNo>{i + 1}</LineNo>
                  <IconButton
                    style={{ margin: "-2px 0px -2px -20px" }}
                    variant="primary"
                    icon="plus"
                    className="hidden"
                    onClick={() => {
                      setShowEditor(i);
                    }}
                  />
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                  {comments[i + 1] &&
                    comments[i + 1].map((comment, key) => (
                      <CommentBox
                        {...comment}
                        key={i * 1000 + key}
                        onReply={() => {
                          setShowEditor(i);
                        }}
                      />
                    ))}
                  {showEditor && i == showEditor ? (
                    <AddComment
                      isReplay={!!comments[i + 1]}
                      questionId={comments[i + 1] && comments[i + 1][0].id}
                      startingLineNum={
                        comments[i + 1] && comments[i + 1][0].startingLineNum
                      }
                      endingLineNum={i + 1}
                      closeCommentEditor={() => setShowEditor(0)}
                      code={code}
                      programmingLanguage={lang}
                      postId={postId}
                      path={path}
                    />
                  ) : null}
                </div>
              ))}
            </code>
          </Pre>
        );
      }}
    </Highlight>
  );
};

interface AddCommentProps extends QuestionProps {
  questionId: string;
}

const AddComment: React.SFC<AddCommentProps> = ({ ...props }) => {
  return props.isReplay ? (
    <CreateQuestionReply {...props} />
  ) : (
    <CreateQuestion {...props} />
  );
};

export const CodeFile: React.SFC<Props> = ({ code, path, postId }) => {
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

        return (
          <HighlightCode
            code={code || ""}
            lang={lang}
            data={data}
            postId={postId}
            path={path}
          />
        );
      }}
    </FindCodeReviewQuestionsComponent>
  );
};
