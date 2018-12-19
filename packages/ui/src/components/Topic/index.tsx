import * as React from "react";
import { MyButton } from "../MyButton";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Topic: React.FunctionComponent<Props> = props => (
  <MyButton variant="topic" {...props} />
);

export default Topic;
