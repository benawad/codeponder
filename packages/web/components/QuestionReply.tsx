import { useInputValue } from "../utils/useInputValue";
import { CreateQuestionReplyComponent } from "./apollo-components";
import { TextEditorResult, TextEditor } from "./CommentForm";
import { wrapEditor } from "./commentUI";

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

interface QuestionReplyProps {
  isReplay: boolean;
  startingLineNum?: number; // not exist before the first commnet created
  endingLineNum: number;
  onEditorSubmit: (T?: any) => void;
  questionId: string;
}

const WrappedTextEditor = wrapEditor(TextEditor);

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
          const questionReply = {
            questionId,
            text,
          };

          const response = await mutate({
            variables: {
              questionReply,
            },
          });

          console.log(response);

          onEditorSubmit({
            submitted: true,
            response,
            data: { type: "reply", ...questionReply },
          });
        } else {
          onEditorSubmit({ submitted: false });
        }
      };
      return <WrappedTextEditor {...{ ...props, submitForm }} />;
    }}
  </CreateQuestionReplyComponent>
);
