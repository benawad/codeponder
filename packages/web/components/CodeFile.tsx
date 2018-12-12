import {
  CreateCodeReviewQuestionComponent,
  FindCodeReviewQuestionsComponent
} from "./apollo-components";
import { QuestionReply } from "./QuestionReply";
import { useInputValue } from "../utils/useInputValue";

interface Props {
  text: string | null;
  username: string;
  branch: string;
  path?: string;
  repo: string;
}

export const CodeFile: React.SFC<Props> = ({
  text,
  path,
  branch,
  username,
  repo
}) => {
  const [startingLineNum, startingLineNumChange] = useInputValue("0");
  const [endingLineNum, endingLineNumChange] = useInputValue("0");
  const [question, questionChange] = useInputValue("");

  return (
    <CreateCodeReviewQuestionComponent>
      {mutate => (
        <>
          <pre>{text}</pre>
          <form
            onSubmit={async e => {
              e.preventDefault();
              const response = await mutate({
                variables: {
                  codeReviewQuestion: {
                    startingLineNum: parseInt(startingLineNum, 10),
                    endingLineNum: parseInt(endingLineNum, 10),
                    question,
                    username,
                    branch,
                    path,
                    repo
                  }
                }
              });

              console.log(response);
            }}
          >
            <input
              name="startingLineNum"
              placeholder="startingLineNum"
              value={startingLineNum}
              onChange={startingLineNumChange}
            />
            <input
              name="endingLineNum"
              placeholder="endingLineNum"
              value={endingLineNum}
              onChange={endingLineNumChange}
            />
            <input
              name="question"
              placeholder="question"
              value={question}
              onChange={questionChange}
            />
            <button type="submit">save</button>
          </form>
          <FindCodeReviewQuestionsComponent
            variables={{
              branch,
              path,
              repo,
              username
            }}
          >
            {({ data, loading }) => {
              if (!data || loading) {
                return null;
              }

              return (
                <div>
                  {data.findCodeReviewQuestions.map(crq => (
                    <div key={crq.id}>
                      <div>{crq.question}</div>
                      <QuestionReply questionId={crq.id} />
                    </div>
                  ))}
                </div>
              );
            }}
          </FindCodeReviewQuestionsComponent>
        </>
      )}
    </CreateCodeReviewQuestionComponent>
  );
};
