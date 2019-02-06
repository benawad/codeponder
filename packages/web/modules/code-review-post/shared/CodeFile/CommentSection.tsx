import { useCallback, useEffect, useRef } from "react";
import { CodeReviewQuestionInfoFragment } from "../../../../generated/apollo-components";
import { EditorSubmitProps } from "../../../../types/questionReplyTypes";
import { getScrollY } from "../../../../utils/domScrollUtils";
import { CreateQuestionReply } from "../QuestionReply";
import { CreateQuestion } from "../QuestionSection/CreateQuestion";

interface AddCommentProps {
  question?: CodeReviewQuestionInfoFragment;
  lineNum: number;
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
  question,
  lineNum,
  setShowEditor,
  view,
}) => {
  const preventScrollRef = useRef(() => {});
  const isReply = !!question;

  const onEditorSubmit = useCallback(({
    submitted,
    response,
  }: EditorSubmitProps) => {
    if (submitted && response) {
      preventScroll(preventScrollRef);
      setShowEditor(false);
    } else {
      setShowEditor(false);
    }
  }, [question]);

  useEffect(() => {
    // clear stopScroll
    preventScrollRef.current();
  }, [question]);

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
