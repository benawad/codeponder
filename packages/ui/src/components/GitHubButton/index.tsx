import * as React from "react";
import { Box, Button, ButtonProps } from "rebass";
import { Icon } from "../Icon";

export const GitHubButton: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children }): JSX.Element => {
  return (
    <Button variant="github">
      <Box mr="1.2rem">
        <Icon name="github" fill="#fff" />
      </Box>
      {children}
    </Button>
  );
};
