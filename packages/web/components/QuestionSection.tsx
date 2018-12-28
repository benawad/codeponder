import * as React from "react";
import { Question } from "@codeponder/ui";

import {
  FindCodeReviewQuestionsComponent,
  FindCodeReviewQuestionsVariables,
} from "./apollo-components";
import { QuestionForm, QuestionFormProps } from "./QuestionForm";

interface Props extends QuestionFormProps {
  variables: FindCodeReviewQuestionsVariables;
  startLinesSelection: number;
  endLinesSelection: number;
  handleLinesSelection: (event: any, inputNumber: number) => void;
}

export const QuestionSection = ({
  variables,
  code,
  postId,
  path,
  programmingLanguage,
  startLinesSelection,
  endLinesSelection,
  handleLinesSelection,
}: Props) => {
  return (
    <FindCodeReviewQuestionsComponent variables={variables}>
      {({ data, loading }) => {
        if (!data || loading) {
          return null;
        }

        return (
          <>
            <QuestionForm
              code={code || ""}
              postId={postId}
              path={path}
              programmingLanguage={programmingLanguage}
              startLinesSelection={startLinesSelection}
              endLinesSelection={endLinesSelection}
              handleLinesSelection={handleLinesSelection}
            />
            <div
              style={{
                border: "1px solid #F2F2F2",
                borderRadius: "5px",
              }}
            >
              {data.findCodeReviewQuestions.map(crq => (
                <Question key={crq.id} {...crq} />
              ))}
            </div>
          </>
        );
      }}
    </FindCodeReviewQuestionsComponent>
  );
};
