import { useInputValue } from "../utils/useInputValue";
import {
  CreateQuestionReplyComponent,
  QuestionReplyInfoFragment,
} from "./apollo-components";
import { TextEditor, TextEditorResult } from "./CommentForm";

interface Props {
  questionId: string;
}

export const QuestionReply: React.SFC<Props> = ({ questionId }) => {
  const [value, onChange] = useInputValue("");

  return (
    <CreateQuestionReplyComponent>
      {mutate => (
        <form
          onSubmit={async e => {
            e.preventDefault();
            const response = await mutate({
              variables: {
                questionReply: {
                  questionId,
                  text: value,
                },
              },
            });

            console.log(response);
          }}
        >
          <input value={value} onChange={onChange} placeholder="...reply" />
        </form>
      )}
    </CreateQuestionReplyComponent>
  );
};

interface EditorSubmitProps {
  submitted: boolean;
  response?: QuestionReplyInfoFragment | void;
}

interface QuestionReplyProps {
  isReply: boolean;
  startingLineNum?: number; // not exist before the first comment created
  endingLineNum: number;
  onEditorSubmit: (T: EditorSubmitProps) => void;
  questionId: string;
}

export const CreateQuestionReply = ({
  questionId,
  onEditorSubmit,
  ...props
}: QuestionReplyProps) => (
  <CreateQuestionReplyComponent>
    {mutate => {
      const submitForm = async ({ cancel, text }: TextEditorResult) => {
        if (!cancel) {
          // save result
          const response = await mutate({
            variables: {
              questionReply: {
                questionId,
                text,
              },
            },
          });

          console.log(response);

          onEditorSubmit({
            submitted: true,
            response:
              response && response.data!.createQuestionReply.questionReply,
          });
        } else {
          onEditorSubmit({ submitted: false });
        }
      };
      return <TextEditor {...{ ...props, submitForm, view: "code-view" }} />;
    }}
  </CreateQuestionReplyComponent>
);
