import * as React from "react";
import { icons } from "./icons";

interface Props {
  name: keyof typeof icons;
  size?: number;
  fill: string;
  style?: any;
}

export const Icon: React.SFC<Props> = ({ name, size = 16, fill, style }) => {
  const { viewBox, d } = icons[name];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox}
      fill={fill}
      style={style}
    >
      <path d={d} />
    </svg>
  );
};
