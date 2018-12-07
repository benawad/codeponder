import * as React from "react";
import Button from "../Button";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Topic: React.FunctionComponent<Props> = props => (
  <Button variant="topic" {...props} />
);

export default Topic;
