import React, { useContext } from "react";
import { EditorSubmitProps } from "../types/questionReplyTypes";
import { CreateCodeReviewQuestionComponent } from "./apollo-components";
import { TextEditor, TextEditorResult } from "./CommentForm";
import { PostContext } from "./PostContext";

export interface CreateQuestionProps {
  onEditorSubmit: (T: EditorSubmitProps) => void;
  isReply: boolean;
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
                  /* TODO add title to code_review_question */
                  path,
                  postId,
                  programmingLanguage: lang,
                },
              },
            });

            console.log(response);

            onEditorSubmit({
              submitted: true,
              response:
                response &&
                response.data!.createCodeReviewQuestion.codeReviewQuestion,
            });
          } else {
            onEditorSubmit({ submitted: false });
          }
        };
        return <TextEditor {...props} submitForm={submitForm} />;
      }}
    </CreateCodeReviewQuestionComponent>
  );
};
