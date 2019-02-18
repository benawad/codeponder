import * as React from "react";
import { icons } from "./icons";

export interface IconProps {
  name: keyof typeof icons;
  size?: number;
  fill: string;
  style?: any;
  onClick?: () => void;
}

export const Icon: React.SFC<IconProps> = ({
  name,
  size = 16,
  fill,
  style,
  onClick,
}) => {
  const { viewBox, d } = icons[name];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox}
      fill={fill}
      style={style}
      onClick={onClick}
    >
      <path d={d} />
    </svg>
  );
};
