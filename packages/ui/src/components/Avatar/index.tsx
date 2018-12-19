import * as React from "react";
import { Image, ImageProps } from "rebass";

interface Props extends ImageProps {
  size?: number;
}

export const Avatar: React.SFC<Props> = ({ size = 16, ...props }) => {
  return <Image height={size} width={size} borderRadius={16.5} {...props} />;
};
