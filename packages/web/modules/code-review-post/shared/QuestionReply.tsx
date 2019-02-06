import { useContext } from "react";
import {
  CreateQuestionReplyComponent,
  FindCodeReviewQuestionsQuery,
  FindCodeReviewQuestionsVariables,
  QuestionReplyInfoFragment,
} from "../../../generated/apollo-components";
import { findCodeReviewQuestionsQuery } from "../../../graphql/code-review-question/query/findCodeReviewQuestions";
import { PostContext } from "./PostContext";
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
}: QuestionReplyProps) => {
  const { postId, path } = useContext(PostContext);

  return (
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
              update: (cache, { data }) => {
                if (!data) {
                  return;
                }

                const x = cache.readQuery<
                  FindCodeReviewQuestionsQuery,
                  FindCodeReviewQuestionsVariables
                >({
                  query: findCodeReviewQuestionsQuery,
                  variables: {
                    postId,
                    path,
                  },
                });

                cache.writeQuery<
                  FindCodeReviewQuestionsQuery,
                  FindCodeReviewQuestionsVariables
                >({
                  query: findCodeReviewQuestionsQuery,
                  variables: {
                    postId,
                    path,
                  },
                  data: {
                    __typename: "Query",
                    findCodeReviewQuestions: x!.findCodeReviewQuestions.map(q =>
                      q.id === questionId
                        ? {
                            ...q,
                            replies: [
                              ...q.replies,
                              data.createQuestionReply.questionReply,
                            ],
                          }
                        : q
                    ),
                  },
                });
              },
            });

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
};
