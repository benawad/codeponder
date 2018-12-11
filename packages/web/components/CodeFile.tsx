import { useState, useCallback } from "react";
import { CreateCodeReviewComponent } from "./apollo-components";

interface Props {
  text: string | null;
  username: string;
  branch: string;
  path?: string;
  repo: string;
}

function useInputValue<T>(initialValue: T): [T, (e: any) => void] {
  const [value, setValue] = useState<T>(initialValue);
  const onChange = useCallback(event => {
    setValue(event.currentTarget.value);
  }, []);

  return [value, onChange];
}

export const CodeFile: React.SFC<Props> = ({
  text,
  path = "/",
  branch,
  username,
  repo
}) => {
  const [startingLineNum, startingLineNumChange] = useInputValue("0");
  const [endingLineNum, endingLineNumChange] = useInputValue("0");
  const [question, questionChange] = useInputValue("");

  return (
    <CreateCodeReviewComponent>
      {mutate => (
        <>
          <pre>{text}</pre>
          <form
            onSubmit={async e => {
              e.preventDefault();
              const response = await mutate({
                variables: {
                  startingLineNum: parseInt(startingLineNum, 10),
                  endingLineNum: parseInt(endingLineNum, 10),
                  question,
                  username,
                  branch,
                  path,
                  repo
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
        </>
      )}
    </CreateCodeReviewComponent>
  );
};
