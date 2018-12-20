import * as React from "react";
import { icons } from "./icons";

interface Props {
  name: keyof typeof icons;
  size?: number;
  fill: string;
}

export const Icon: React.SFC<Props> = ({ name, size = 16, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill={fill}
    >
      <path d={icons[name]} />
    </svg>
  );
};
