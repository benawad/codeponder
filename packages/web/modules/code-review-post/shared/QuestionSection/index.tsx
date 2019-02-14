import { Question } from "@codeponder/ui";
import React from "react";
import { FindCodeReviewQuestionsComponent, FindCodeReviewQuestionsVariables } from "../../../../generated/apollo-components";
import { CreateQuestion } from "../CreateQuestion";

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
            <div
              style={{ fontSize: 24, fontFamily: "rubik", marginTop: "4rem", marginBottom: '.5rem' }}
            >
              Questions
            </div>
            <CreateQuestion view="repo-view" />
            <div
              style={{
                border: "1px solid #F2F2F2",
                borderRadius: "5px",
              }}
            >
              {data &&
                data.findCodeReviewQuestions.map(crq => (
                  <Question key={crq.id} {...crq} />
                ))}
            </div>
          </>
        );
      }}
    </FindCodeReviewQuestionsComponent>
  );
};
