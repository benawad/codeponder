import * as React from "react";
import { Card, CardProps } from "rebass";

export const SidebarCard: React.SFC<
  CardProps & { flex?: string; style?: React.CSSProperties }
> = ({ children, ...props }) => {
  return (
    <Card
      bg="#fff"
      boxShadow="0rem .2rem .5rem rgba(0, 0, 0, 0.1)"
      borderRadius={5}
      {...props}
    >
      {children}
    </Card>
  );
};
