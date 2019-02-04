import { Question } from "@codeponder/ui";
import React, { useCallback, useState } from "react";
import {
  CodeReviewQuestionInfoFragment,
  FindCodeReviewQuestionsComponent,
  FindCodeReviewQuestionsVariables,
} from "../../../../generated/apollo-components";
import { EditorSubmitProps } from "../../../../types/questionReplyTypes";
import { CreateQuestion } from "./CreateQuestion";

interface Props {
  variables: FindCodeReviewQuestionsVariables;
}

interface QuestionListProps {
  list: CodeReviewQuestionInfoFragment[];
}

const InnerQuestionSection: React.FC<QuestionListProps> = ({ list }) => {
  const [questions, updateQuestions] = useState(list);

  const onEditorSubmit = useCallback(
    ({ submitted, response }: EditorSubmitProps) => {
      if (submitted && response) {
        updateQuestions([
          ...questions,
          response as CodeReviewQuestionInfoFragment,
        ]);
      }
    },
    [questions]
  );

  return (
    <>
      <CreateQuestion
        onEditorSubmit={onEditorSubmit}
        isReply={false}
        view="repo-view"
      />
      <div
        style={{
          border: "1px solid #F2F2F2",
          borderRadius: "5px",
        }}
      >
        {questions.map(crq => (
          <Question key={crq.id} {...crq} />
        ))}
      </div>
    </>
  );
};

export const QuestionSection = ({ variables }: Props) => {
  return (
    <FindCodeReviewQuestionsComponent variables={variables}>
      {({ data, loading }) => {
        if (!data || loading) {
          return null;
        }
        return <InnerQuestionSection list={data.findCodeReviewQuestions} />;
      }}
    </FindCodeReviewQuestionsComponent>
  );
};
