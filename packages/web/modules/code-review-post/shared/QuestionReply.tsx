import {
  CreateQuestionReplyComponent,
  QuestionReplyInfoFragment,
} from "../../../generated/apollo-components";
import { TextEditor, TextEditorResult } from "./QuestionSection/CommentForm";

interface EditorSubmitProps {
  submitted: boolean;
  response?: QuestionReplyInfoFragment | void;
}

interface QuestionReplyProps {
  isReply: boolean;
  lineNum?: number;
  onEditorSubmit: (T: EditorSubmitProps) => void;
  questionId: string;
  view: "code-view" | "repo-view";
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
      return <TextEditor {...props} submitForm={submitForm} />;
    }}
  </CreateQuestionReplyComponent>
);
