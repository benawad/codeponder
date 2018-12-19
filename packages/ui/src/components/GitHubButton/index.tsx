import * as React from "react";
import { ButtonProps, Button } from "rebass";
import { Github } from "styled-icons/fa-brands";

export const GitHubButton: React.SFC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children }) => {
  return (
    <Button>
      {children}
      <Github />
    </Button>
  );
};
