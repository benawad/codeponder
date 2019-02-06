import "prismjs/themes/prism-coy.css";
import * as React from "react";
import styled, {
  FlattenSimpleInterpolation,
  SimpleInterpolation,
} from "styled-components";

interface Props extends React.HTMLAttributes<HTMLPreElement> {
  fontSize?: number;
  lang: string;
  selectedLines: FlattenSimpleInterpolation;
}

interface styleProps {
  fontSize?: number;
  selectedLines: SimpleInterpolation;
}

const Pre = styled.pre`
  font-size: ${(p: styleProps) => p.fontSize || 14}px;

  &.code-content code[class*="language-"] {
    /* override prism-coy border */
    border: 1px solid #ddd;
    border-radius: 3px;
    box-shadow: none;
    margin-bottom: 1em;
    margin-top: 1em;
    overflow: hidden;
    padding: 0;
  }

  & .token-line {
    display: flex;
    flex-direction: column;

    &[class*="is-selected"] {
      background: hsla(24, 20%, 50%, 0.08);
      background: linear-gradient(
        to right,
        hsla(24, 20%, 50%, 0.1) 70%,
        hsla(24, 20%, 50%, 0)
      );
    }

    & .token-html {
      padding-left: 0.9rem;
      padding-right: 0.9rem;

      /* line-number */
      &::before {
        content: attr(data-line-number);
        color: #999;
        display: inline-block;
        letter-spacing: -1px;
        padding-right: 1.5em;
        text-align: right;
        user-select: none;
        min-width: 3em;
      }
    }
  }

  & .token-btn {
    appearance: none;
    border: none;
    font-family: "Rubik", sans-serif;
    font-weight: 500;
    text-align: center;
    text-transform: uppercase;
  }

  & .btn-open-edit {
    /* primary color */
    background-color: ${p => p.theme.colors.primary[3]};
    color: #ffffff;
    font-size: 1.4rem;
    border-radius: 0.4rem;

    margin: -2px 0px -2px -20px;
    padding: 0;
    width: 22px;
    height: 22px;
    transform: scale(0.8);
    transition: transform 0.1s ease-in-out;

    opacity: 0;
    font-size: 16px;
    line-height: 1;
    vertical-align: middle;
  }

  &.js-select-line {
    & .token-line {
      cursor: pointer;
    }
  }

  &:not(.js-select-line) {
    & .token-line:not([class*="is-selected"]) {
      & .btn-open-edit:hover {
        opacity: 1;
        cursor: pointer;
        transform: scale(1);
      }
    }
  }

  & .discussion-badge {
    background-color: transparent;
    color: ${p => p.theme.colors.primary[2]};
    cursor: pointer;
    display: flex;
    width: 36px;
    height: 22px;
    line-height: 1;
    position: absolute;
    right: 0;
    transform: scale(1);
    transition: transform 0.1s ease-in-out;
    &:hover {
      transform: scale(1.2);
    }

    & .badge-counter {
      background-color: ${p => p.theme.colors.primary[3]};
      border-radius: 50%;
      font-size: 10px;
      margin: 0;
      padding: 5.5px 0;
      width: 20px;
      height: 20px;
    }

    & .badge-icon {
      font-size: 20px;
      vertical-align: middle;
      transition: transform 0.3s ease-in-out;
    }

    &.is-open .badge-icon {
      transform: rotate(0.5turn);
    }
  }

  & .inner-animate-box {
    max-height: 0;
    opacity: 0;
    transition: max-height 200ms ease-in-out, opacity 300ms ease-in-out;

    &.is-open {
      max-height: 2000px;
      opacity: 1;
    }
  }

  ${(p: styleProps) => p.selectedLines}
`;

export const CodeCard: React.FunctionComponent<Props> = ({
  lang,
  children,
  ...props
}) => (
  <Pre className={`code-content language-${lang}`} {...props}>
    <code className={`language-${lang}`}>{children}</code>
  </Pre>
);
