import * as React from "react";
import { Image, ImageProps } from "rebass";

interface Props extends ImageProps {
  size?: number;
}

export const Avatar: React.FC<Props> = ({
  size = 16,
  ...props
}): JSX.Element => {
  return (
    <Image height={size} width={size} borderRadius={"1.65rem"} {...props} />
  );
};
