import { useCallback, useContext, useEffect, useRef } from "react";
import {
  CommentProps,
  EditorSubmitProps,
  QuestionProps,
} from "../../../../types/questionReplyTypes";
import { getScrollY } from "../../../../utils/domScrollUtils";
import { PostContext } from "../PostContext";
import { CreateQuestionReply } from "../QuestionReply";
import { CreateQuestion } from "../QuestionSection/CreateQuestion";

interface AddCommentProps {
  comments: CommentProps[];
  lineNum: number;
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
  lineNum,
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
        setTimeout(() => setShowEditor(false), 200);
      }
    },
    [comments]
  );

  useEffect(() => {
    // clear stopScroll
    preventScrollRef.current();
  }, [comments]);

  const commentProps = {
    isReply,
    lineNum,
    onEditorSubmit,
    view,
  };

  return isReply ? (
    <CreateQuestionReply {...commentProps} questionId={question!.id} />
  ) : (
    <CreateQuestion {...commentProps} />
  );
};
