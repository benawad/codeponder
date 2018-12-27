import * as React from "react";
import { ButtonProps, Button, Box } from "rebass";
import { Icon } from "../Icon";

export const GitHubButton: React.SFC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children }) => {
  return (
    <Button variant="github">
      <Box mr="1.2rem">
        <Icon name="github" fill="#fff" />
      </Box>
      {children}
    </Button>
  );
};
