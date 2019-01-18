import * as React from "react";
import { Question } from "@codeponder/ui";

import {
  FindCodeReviewQuestionsComponent,
  FindCodeReviewQuestionsVariables,
} from "./apollo-components";
import { CreateQuestion } from "./Question";

interface Props {
  variables: FindCodeReviewQuestionsVariables;
}

export const QuestionSection = ({ variables }: Props) => {
  return (
    <FindCodeReviewQuestionsComponent variables={variables}>
      {({ data, loading }) => {
        if (!data || loading) {
          return null;
        }

        return (
          <>
            <CreateQuestion
              onEditorSubmit={() => {}}
              isReply={false}
              view="repo-view"
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
