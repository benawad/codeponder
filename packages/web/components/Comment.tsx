import { CreateQuestion, QuestionProps } from "./QuestionForm";

export const AddComment: React.SFC<QuestionProps> = ({ ...props }) => {
  return <CreateQuestion {...props} />;
};
