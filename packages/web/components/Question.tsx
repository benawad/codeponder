import React, { useContext } from "react";
import {
  CreateCodeReviewQuestionComponent,
  CodeReviewQuestionInfoFragment,
} from "./apollo-components";
import { TextEditor, TextEditorResult } from "./CommentForm";
import { PostContext } from "./PostContext";

interface EditorSubmitProps {
  submitted: boolean;
  response?: CodeReviewQuestionInfoFragment | void;
}

export interface CreateQuestionProps {
  onEditorSubmit: (T: EditorSubmitProps) => void;
  isReply: boolean;
  endingLineNum?: number;
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
          startingLineNum,
          endingLineNum,
          text,
        }: TextEditorResult) => {
          if (!cancel) {
            // save result
            const response = await mutate({
              variables: {
                codeReviewQuestion: {
                  startingLineNum,
                  endingLineNum,
                  codeSnippet: !code
                    ? null
                    : code
                        .split("\n")
                        .slice(startingLineNum - 1, endingLineNum)
                        .join("\n"),
                  text: text,
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
