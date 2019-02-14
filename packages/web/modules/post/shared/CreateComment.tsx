import { useContext } from "react";
import {
  CommentInfoFragment,
  CreateCommentComponent,
  FindQuestionsQuery,
  FindQuestionsVariables,
} from "../../../generated/apollo-components";
import { findQuestionsQuery } from "../../../graphql/question/query/findQuestions";
import { CommentForm, TextEditorResult } from "./CommentForm";
import { PostContext } from "./PostContext";

interface EditorSubmitProps {
  submitted: boolean;
  response?: CommentInfoFragment | void;
}

interface QuestionReplyProps {
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
    <CreateCommentComponent>
      {mutate => {
        const submitForm = async ({ cancel, text }: TextEditorResult) => {
          if (!cancel) {
            // save result
            const response = await mutate({
              variables: {
                comment: {
                  questionId,
                  text,
                },
              },
              update: (cache, { data }) => {
                if (!data) {
                  return;
                }

                const x = cache.readQuery<
                  FindQuestionsQuery,
                  FindQuestionsVariables
                >({
                  query: findQuestionsQuery,
                  variables: {
                    postId,
                    path,
                  },
                });

                cache.writeQuery<FindQuestionsQuery, FindQuestionsVariables>({
                  query: findQuestionsQuery,
                  variables: {
                    postId,
                    path,
                  },
                  data: {
                    __typename: "Query",
                    findQuestions: x!.findQuestions.map(q =>
                      q.id === questionId
                        ? {
                            ...q,
                            replies: [
                              ...q.comments,
                              data.createComment.comment,
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
              response: response && response.data!.createComment.comment,
            });
          } else {
            onEditorSubmit({ submitted: false });
          }
        };
        return (
          <CommentForm {...props} isReply={true} submitForm={submitForm} />
        );
      }}
    </CreateCommentComponent>
  );
};
