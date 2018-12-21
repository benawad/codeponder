import * as React from "react";
import { Card, CardProps } from "rebass";

export const SidebarCard: React.SFC<CardProps> = ({ children, ...props }) => {
  return (
    <Card
      bg="#fff"
      boxShadow="0px 2px 5px rgba(0, 0, 0, 0.1)"
      borderRadius={5}
      {...props}
    >
      {children}
    </Card>
  );
};
