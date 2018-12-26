import * as React from "react";
import {
  FindCodeReviewQuestionsComponent,
  FindCodeReviewQuestionsVariables,
} from "./apollo-components";
import { QuestionForm, QuestionFormProps } from "./QuestionForm";
import { Question } from "./Question";
import { ChangeEvent } from "react";

interface Props extends QuestionFormProps {
  variables: FindCodeReviewQuestionsVariables;
  startLinesSelection: number;
  endLinesSelection: number;
  handleStartLinesSelection: (event: ChangeEvent<HTMLInputElement>) => void;
  handleEndLinesSelection: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const QuestionSection = ({
  variables,
  code,
  postId,
  path,
  programmingLanguage,
  startLinesSelection,
  endLinesSelection,
  handleStartLinesSelection,
  handleEndLinesSelection,
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
              handleStartLinesSelection={handleStartLinesSelection}
              handleEndLinesSelection={handleEndLinesSelection}
            />
            <div>
              {data.findCodeReviewQuestions.map(crq => (
                <Question key={crq.id} q={crq} />
              ))}
            </div>
          </>
        );
      }}
    </FindCodeReviewQuestionsComponent>
  );
};
