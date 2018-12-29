import * as React from "react";
import styled from "styled-components";
import { buttonStyle } from "styled-system";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "topic" | "form";
  icon?: keyof typeof icons;
}

// Add more icons here
const icons = {
  plus: {
    viewBox: "0 0 12 16",
    width: 12,
    height: 16,
    d: "M12 9H7v5H5V9H0V7h5V2h2v5h5v2z",
  },
};

// interface SVG {
//   viewBox: string;
//   width: number;
//   height: number;
//   d: string;
// }

// interface ICONS {
//   [key: string]: SVG;
// }

const StyledButton = styled.button`
  appearance: none;
  border: none;
  text-align: center;
  /*font-family: "Rubik", sans-serif;*/
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
  ${buttonStyle}

  margin: 0;
  padding: 0;
  width: 22px;
  height: 22px;
  transform: scale(0.8);
  transition: transform 0.1s ease-in-out;

  &.hidden {
    opacity: 0;
  }

  &:hover {
    transform: scale(1);
    opacity: 1;
  }

  &.is-hovered {
    opacity: 1;
  }

  & svg {
    display: inline-block;
    fill: currentColor;
    vertical-align: text-top;
    pointer-events: none;
  }
`;

const getSvg = (name: string) => {
  const svg = icons[name || ""];
  if (!svg) {
    return null;
  }
  return (
    <svg
      viewBox={svg.viewBox}
      version="1.1"
      width={svg.width}
      height={svg.height}
      aria-hidden="true"
      preserveAspectRatio="xMaxYMax meet"
    >
      <path fillRule="evenodd" d={svg.d} />
    </svg>
  );
};

export const IconButton: React.FunctionComponent<Props> = ({
  icon,
  ...props
}) => (
  <StyledButton {...props}>
    {getSvg(icon || "")}
    {false && icon ? (
      <svg
        viewBox="0 0 12 16"
        version="1.1"
        width="12"
        height="16"
        aria-hidden="true"
        preserveAspectRatio="xMaxYMax meet"
      >
        <path fillRule="evenodd" d={icon} />
      </svg>
    ) : null}
  </StyledButton>
);
