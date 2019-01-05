import { CreateQuestion } from "./QuestionForm";
import { CommentProps } from "./commentUI";
import { CreateQuestionReply } from "./QuestionReply";

interface AddCommentProps {
  onEditorSubmit: (T?: any) => void;
  comments: CommentProps[];
  line: number;
}

export const AddComment: React.SFC<AddCommentProps> = ({
  comments,
  line,
  onEditorSubmit,
}) => {
  const isReplay = comments.length > 0;
  const question = isReplay ? comments[0] : undefined;

  const commentProps = {
    isReplay,
    endingLineNum: line,
    onEditorSubmit,
  };

  return isReplay ? (
    <CreateQuestionReply
      {...commentProps}
      startingLineNum={question!.startingLineNum}
      questionId={question!.id}
    />
  ) : (
    <CreateQuestion {...commentProps} />
  );
};
