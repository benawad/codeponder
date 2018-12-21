import * as React from "react";
import { CodeReviewQuestionInfoFragment } from "./apollo-components";
import { QuestionReply } from "./QuestionReply";

interface Props {
  q: CodeReviewQuestionInfoFragment;
}

export const Question = ({ q }: Props) => {
  return (
    <div key={q.id}>
      <div>|{q.creator.username}|</div>
      <div>{q.text}</div>
      {q.replies.map(reply => (
        <div key={reply.id} style={{ color: "pink" }}>
          <div>${reply.creator.username}$</div>
          {reply.text}
        </div>
      ))}
      <QuestionReply questionId={q.id} />
    </div>
  );
};
