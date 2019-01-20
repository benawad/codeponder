import { useCallback, useContext, useEffect, useRef } from "react";
import { CreateQuestion } from "./Question";
import {
  CommentProps,
  QuestionProps,
  EditorSubmitProps,
} from "../types/questionReplyTypes";
import { CreateQuestionReply } from "./QuestionReply";
import { getScrollY } from "../utils/domScrollUtils";
import { PostContext } from "./PostContext";

interface AddCommentProps {
  comments: CommentProps[];
  line: number;
  setComments: React.Dispatch<React.SetStateAction<CommentProps[]>>;
  setShowEditor: React.Dispatch<React.SetStateAction<boolean>>;
  view: "code-view" | "repo-view";
}

// prevent page scroll after submitting comment form
const preventScroll = (ref: React.MutableRefObject<() => void>) => {
  const scrollPosition = getScrollY();
  const stopScroll = (event: UIEvent): void => {
    event.preventDefault();
    window.scrollTo(0, scrollPosition);
  };
  window.addEventListener("scroll", stopScroll);
  ref.current = () => {
    window.removeEventListener("scroll", stopScroll);
    ref.current = () => {};
  };
};

export const AddComment: React.SFC<AddCommentProps> = ({
  comments,
  line,
  setComments,
  setShowEditor,
  view,
}) => {
  const { owner } = useContext(PostContext);
  const preventScrollRef = useRef(() => {});
  const isReply = comments.length > 0;
  const question = isReply ? (comments[0] as QuestionProps) : undefined;

  const onEditorSubmit = useCallback(
    ({ submitted, response }: EditorSubmitProps) => {
      if (submitted && response) {
        const data = {
          ...response,
          isOwner: response.creator.username == owner,
          newComment: true,
        };
        preventScroll(preventScrollRef);
        setComments([...comments, data]);
        setShowEditor(false);
      } else {
        // wait until close animation is finished
        setTimeout(() => setShowEditor(false), 400);
      }
    },
    [comments]
  );

  useEffect(
    () => {
      // clear stopScroll
      preventScrollRef.current();
    },
    [comments]
  );

  const commentProps = {
    isReply,
    endingLineNum: line,
    onEditorSubmit,
    view,
  };

  return isReply ? (
    <CreateQuestionReply
      {...commentProps}
      startingLineNum={question!.startingLineNum}
      questionId={question!.id}
    />
  ) : (
    <CreateQuestion {...commentProps} />
  );
};
