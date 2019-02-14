import { Question } from "@codeponder/ui";
import React from "react";
import { FindQuestionsComponent, FindQuestionsVariables } from "../../../../generated/apollo-components";
import { Link } from "../../../../server/routes";
import { CreateQuestion } from "../CreateQuestion";

interface Props {
  variables: FindQuestionsVariables;
}

export const QuestionSection = ({ variables }: Props) => {
  return (
    <FindQuestionsComponent variables={variables}>
      {({ data, loading }) => {
        if (!data || loading) {
          return null;
        }

        return (
          <>
            <div
              style={{
                fontSize: 24,
                fontFamily: "rubik",
                marginTop: "4rem",
                marginBottom: ".5rem",
              }}
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
                data.findQuestions.map(crq => {
                  const params: Record<string, string> = {
                    id: crq.postId,
                    questionId: crq.id,
                  };

                  if (crq.path) {
                    params.path = crq.path;
                  }

                  return (
                    <Question
                      key={crq.id}
                      renderLink={body => (
                        <Link route="post" params={params}>
                          <a>{body}</a>
                        </Link>
                      )}
                      {...crq}
                    />
                  );
                })}
            </div>
          </>
        );
      }}
    </FindQuestionsComponent>
  );
};
