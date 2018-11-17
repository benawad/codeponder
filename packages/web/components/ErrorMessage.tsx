import * as React from "react";
import { Message } from "semantic-ui-react";

/*
{
  email: 'wrong'
}

*/

export const ErrorMessage = ({
  errors
}: {
  errors: { [key: string]: string };
}) => {
  const entries = Object.entries(errors);
  if (!entries.length) {
    return null;
  }

  return (
    <Message negative>
      {entries.map(([path, message]) => (
        <React.Fragment key={`${path}-${message}`}>
          <p>{message}</p>
        </React.Fragment>
      ))}
    </Message>
  );
};
