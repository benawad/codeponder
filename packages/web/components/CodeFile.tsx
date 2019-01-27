import { CodeCard, css } from "@codeponder/ui";
import { useContext, useEffect, useState } from "react";
import { CommentProps, QuestionInfo } from "../types/questionReplyTypes";
import { getHighlightedCode } from "../utils/highlightCode";
import {
  CodeReviewQuestionInfoFragment,
  FindCodeReviewQuestionsComponent,
  QuestionReplyInfoFragment,
} from "./apollo-components";
import { RenderLine } from "./CodeLine";
import { PostContext } from "./PostContext";

interface Comments {
  [key: number]: CommentProps[];
}

interface loadingCodeState {
  pending: boolean;
  resolved?: string[];
}

/*
 * *Styles for the line numbers coming from the server
 *
 */
const SelectLines = (prop: CodeReviewQuestionInfoFragment[]) => {
  const styles = prop.reduce((total, current) => {
    const { startingLineNum, endingLineNum } = current;
    total += `
     & .token-line:nth-child(n+${startingLineNum}):nth-child(-n+${endingLineNum}) {
      background: hsla(24, 20%, 50%,.08);
      background: linear-gradient(to right, hsla(24, 20%, 50%,.1) 70%, hsla(24, 20%, 50%,0));
    }
     `;
    return total;
  }, "");

  return css`
    ${styles}
  `;
};

const getCommentsForFile = (
  prop: CodeReviewQuestionInfoFragment[],
  owner: string
): Comments => {
  const comment = (
    data: QuestionInfo | QuestionReplyInfoFragment
  ): CommentProps => {
    return { ...data, isOwner: data.creator.username == owner };
  };
  return prop.reduce((comments: Comments, props) => {
    const { replies, ...question } = props;
    const key = question.endingLineNum;
    comments[key] = comments[key] || [];
    comments[key].push({
      ...comment(question),
    });
    replies.forEach(reply => comments[key].push(comment(reply)));
    return comments;
  }, {});
};

const setIsHovered = (
  questions: CodeReviewQuestionInfoFragment[],
  { target: elm, currentTarget: parent, type }: any
) => {
  // let the comment form handle the event
  if (parent.classList.contains("js-select-line")) {
    return;
  }
  while (elm && elm != parent && !elm.classList.contains("token-line")) {
    elm = elm.parentNode || null;
  }
  if (elm && parent) {
    let isOverLine =
      type == "mouseover" && elm.classList.contains("token-line");

    let numberElm = elm.childNodes[0];
    const currentLine = +numberElm.dataset.lineNumber;
    // we only allow one question on lines range
    if (isOverLine && questions.length > 0) {
      isOverLine = !questions.some(
        q => currentLine >= q.startingLineNum && currentLine <= q.endingLineNum
      );
    }

    parent
      .querySelectorAll(".is-hovered")
      .forEach((elm: Element) => elm.classList.remove("is-hovered"));
    if (isOverLine) {
      elm.classList.add("is-hovered");
    }
  }
};

const PLUSBUTTON = `<button class="btn-open-edit token-btn">+</button>`;

const useHighlight = (lang: string, code: string) => {
  const [highlightCode, setHighlightCode] = useState<loadingCodeState>({
    pending: true,
  });

  useEffect(() => {
    getHighlightedCode(code, lang).then(highlightedCode => {
      const tokens = highlightedCode.split("\n").map(line => {
        return `${PLUSBUTTON}${line}`;
      });

      setHighlightCode({ pending: false, resolved: tokens });
    });

    return () => {};
  }, []);
  return highlightCode;
};

export const CodeFile: React.FC = () => {
  const { code, lang, owner, path, postId } = useContext(PostContext);
  const highlightCode = useHighlight(lang, code || "");
  const variables = {
    path,
    postId,
  };

  return (
    <FindCodeReviewQuestionsComponent variables={variables}>
      {({ data, loading }) => {
        if (!data || loading || highlightCode.pending) {
          return null;
        }

        const highlightedCode = highlightCode.resolved!;
        const questions = data.findCodeReviewQuestions;
        const comments = getCommentsForFile(questions, owner);

        const onMouseOverAndOut = setIsHovered.bind(null, questions);
        return (
          <CodeCard
            lang={lang}
            selectedLines={SelectLines(questions)}
            onMouseOut={onMouseOverAndOut}
            onMouseOver={onMouseOverAndOut}
          >
            {highlightedCode.map((line, index) => (
              <RenderLine
                key={index}
                comments={comments[index + 1]}
                line={line}
                lineNum={index + 1}
              />
            ))}
          </CodeCard>
        );
      }}
    </FindCodeReviewQuestionsComponent>
  );
};
