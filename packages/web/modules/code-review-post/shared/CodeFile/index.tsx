import { CodeCard, css } from "@codeponder/ui";
import { useContext, useEffect, useState } from "react";
import {
  CodeReviewQuestionInfoFragment,
  FindCodeReviewQuestionsComponent,
  QuestionReplyInfoFragment,
} from "../../../../generated/apollo-components";
import {
  CommentProps,
  QuestionInfo,
} from "../../../../types/questionReplyTypes";
import { getHighlightedCode } from "../../../../utils/highlightCode";
import { PostContext } from ".././PostContext";
import { RenderLine } from "./CodeLine";

interface Comments {
  [key: number]: CommentProps[];
}

interface LoadingCodeState {
  pending: boolean;
  resolved?: string[];
}

/*
 * *Styles for the line numbers coming from the server
 *
 */
const selectLines = (prop: CodeReviewQuestionInfoFragment[]) => {
  const styles = prop.reduce((total, current) => {
    const { lineNum } = current;
    total += `
     & .token-line:nth-child(n+${lineNum}):nth-child(-n+${lineNum}) {
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
    const key = question.lineNum;
    if (key) {
      comments[key] = comments[key] || [];
      comments[key].push({
        ...comment(question),
      });
      replies.forEach(reply => comments[key].push(comment(reply)));
    }
    return comments;
  }, {});
};

const PLUSBUTTON = `<button class="btn-open-edit token-btn">+</button>`;

const useHighlight = (lang: string, code: string) => {
  const [highlightCode, setHighlightCode] = useState<LoadingCodeState>({
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

  return (
    <FindCodeReviewQuestionsComponent
      variables={{
        path,
        postId,
      }}
    >
      {({ data, loading }) => {
        if (!data || loading || highlightCode.pending) {
          return null;
        }

        const comments = getCommentsForFile(
          data.findCodeReviewQuestions,
          owner
        );
        return (
          <CodeCard
            lang={lang}
            selectedLines={selectLines(data.findCodeReviewQuestions)}
          >
            {highlightCode.resolved!.map((line, index) => {
              return (
                <RenderLine
                  key={index}
                  comments={comments[index + 1] || []}
                  line={line}
                  lineNum={index + 1}
                />
              );
            })}
          </CodeCard>
        );
      }}
    </FindCodeReviewQuestionsComponent>
  );
};
