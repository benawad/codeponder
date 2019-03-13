import * as React from "react";
import { MyButton } from "../MyButton";

export const Topic: React.FunctionComponent<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props): JSX.Element => <MyButton variant="topic" {...props} />;
