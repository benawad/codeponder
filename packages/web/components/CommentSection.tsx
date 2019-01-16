import { CreateQuestion } from "./QuestionForm";
import { CommentProps, QuestionProps } from "./commentUI";
import { CreateQuestionReply } from "./QuestionReply";

interface AddCommentProps {
  onEditorSubmit: (T: any) => void;
  comments: CommentProps[];
  line: number;
}

export const AddComment: React.SFC<AddCommentProps> = ({
  comments,
  line,
  onEditorSubmit,
}) => {
  const isReply = comments.length > 0;
  const question = isReply ? (comments[0] as QuestionProps) : undefined;

  const commentProps = {
    isReply,
    endingLineNum: line,
    onEditorSubmit,
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
