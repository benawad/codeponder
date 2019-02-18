import React, { useContext } from "react";
import {
  CreateQuestionComponent,
  FindQuestionsQuery,
  FindQuestionsVariables,
  QuestionInfoFragment,
} from "../../../generated/apollo-components";
import { findQuestionsQuery } from "../../../graphql/question/query/findQuestions";
import { CommentForm, TextEditorResult } from "./CommentForm";
import { PostContext } from "./PostContext";

interface EditorSubmitProps {
  submitted: boolean;
  response?: QuestionInfoFragment | void;
}
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
    <CreateQuestionComponent>
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
                question: {
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

                try {
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
                      findQuestions: [
                        ...x!.findQuestions,
                        data.createQuestion.question,
                      ],
                    },
                  });
                } catch {}

                try {
                  const x = cache.readQuery<
                    FindQuestionsQuery,
                    FindQuestionsVariables
                  >({
                    query: findQuestionsQuery,
                    variables: {
                      postId,
                      path: "",
                    },
                  });

                  cache.writeQuery<FindQuestionsQuery, FindQuestionsVariables>({
                    query: findQuestionsQuery,
                    variables: {
                      postId,
                      path: "",
                    },
                    data: {
                      __typename: "Query",
                      findQuestions: [
                        ...x!.findQuestions,
                        data.createQuestion.question,
                      ],
                    },
                  });
                } catch {}
              },
            });

            console.log(response);

            if (onEditorSubmit) {
              onEditorSubmit({
                submitted: true,
                response: response && response.data!.createQuestion.question,
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
    </CreateQuestionComponent>
  );
};
