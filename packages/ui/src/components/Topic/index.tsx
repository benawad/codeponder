import * as React from "react";
import { MyButton } from "../MyButton";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Topic: React.FunctionComponent<Props> = props => (
  <MyButton variant="topic" {...props} />
);
