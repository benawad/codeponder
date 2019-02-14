import React, { useContext } from "react";
import {
  CreateCodeReviewQuestionComponent,
  FindCodeReviewQuestionsQuery,
  FindCodeReviewQuestionsVariables,
} from "../../../generated/apollo-components";
import { findCodeReviewQuestionsQuery } from "../../../graphql/code-review-question/query/findCodeReviewQuestions";
import { EditorSubmitProps } from "../../../types/questionReplyTypes";
import { CommentForm, TextEditorResult } from "./CommentForm";
import { PostContext } from "./PostContext";

export interface CreateQuestionProps {
  onEditorSubmit?: (T: EditorSubmitProps) => void;
  lineNum?: number;
  view: "code-view" | "repo-view";
}

export const CreateQuestion = ({
  onEditorSubmit,
  ...props
}: CreateQuestionProps) => {
  const { code, path, postId, lang } = useContext(PostContext);
  return (
    <CreateCodeReviewQuestionComponent>
      {mutate => {
        const submitForm = async ({
          cancel,
          lineNum,
          text,
          title,
        }: TextEditorResult) => {
          if (!cancel) {
            // save result
            const response = await mutate({
              variables: {
                codeReviewQuestion: {
                  lineNum,
                  codeSnippet:
                    !code || !lineNum
                      ? null
                      : code
                          .split("\n")
                          .slice(
                            Math.max(1, lineNum - 5),
                            Math.min(code.length, lineNum + 5)
                          )
                          .join("\n"),
                  text,
                  title,
                  path,
                  postId,
                  programmingLanguage: lang,
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
                    findCodeReviewQuestions: [
                      ...x!.findCodeReviewQuestions,
                      data.createCodeReviewQuestion.codeReviewQuestion,
                    ],
                  },
                });
              },
            });

            console.log(response);

            if (onEditorSubmit) {
              onEditorSubmit({
                submitted: true,
                response:
                  response &&
                  response.data!.createCodeReviewQuestion.codeReviewQuestion,
              });
            }
          } else {
            if (onEditorSubmit) {
              onEditorSubmit({ submitted: false });
            }
          }
        };
        return (
          <CommentForm {...props} isReply={false} submitForm={submitForm} />
        );
      }}
    </CreateCodeReviewQuestionComponent>
  );
};
