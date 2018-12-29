import * as React from "react";
import styled from "styled-components";
import { buttonStyle } from "styled-system";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "topic" | "form";
}

const StyledButton = styled.button`
  appearance: none;
  border: none;
  text-align: center;
  font-family: "Rubik", sans-serif;
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
  ${buttonStyle}
`;

export const MyButton: React.FunctionComponent<Props> = props => (
  <StyledButton {...props} />
);
