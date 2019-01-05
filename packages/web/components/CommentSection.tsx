import { CreateQuestion } from "./QuestionForm";
import { CommentProps } from "./commentUI";
import { CreateQuestionReply } from "./QuestionReply";

export interface CommentData {
  code: string;
  path?: string;
  lang: string;
  postId: string;
}

interface AddCommentProps extends CommentData {
  onEditorSubmit: (T?: any) => void;
  comments: CommentProps[];
  line: number;
}

export const AddComment: React.SFC<AddCommentProps> = ({
  comments,
  line,
  lang,
  ...props
}) => {
  const isReplay = comments.length > 0;
  const question = isReplay ? comments[0] : undefined;

  const commentProps = {
    isReplay,
    endingLineNum: line,
    programmingLanguage: lang,
    ...props,
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
