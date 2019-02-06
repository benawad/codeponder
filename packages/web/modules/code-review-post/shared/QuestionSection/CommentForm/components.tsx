import { BlueInput } from "@codeponder/ui";
import styled from "styled-components";

interface FormInputProps {
  minHeight?: string;
  width?: string;
}

export const FormInput = styled(BlueInput)`
  background: #f2f2f2;
  border: 1px solid transparent;
  font-size: 1em;
  min-height: ${(p: FormInputProps) => p.minHeight};
  padding: 0.6rem 1rem;
  width: ${(p: FormInputProps) => p.width || "100%"};

  &:focus {
    border: 1px solid #2188ff;
    box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075),
      0 0 0 0.2em rgba(3, 102, 214, 0.3);
  }

  /* hide spinners on number input field
  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
  */
`;

export const FormRow = styled.div`
  padding: 1rem 0.9rem;
`;

export const Separator = styled.div`
  width: 100%
  height: 1;
  background: #f2f2f2;
`;

export const FormContainer = styled.div`
  background-color: #ffffff;
  border-top: ${(p: { isReply: boolean; view: string }) =>
    p.isReply ? "none" : "1px solid #d1d5da"};
  border-bottom: ${p =>
    p.view === "repo-view" ? "none" : "1px solid #d1d5da"};
  display: flex;
  flex-direction: column;
  padding: ${(p: { isReply: boolean }) => (p.isReply ? "0" : "0 0.9rem")};

  &.is-open {
    padding: ${(p: { isReply: boolean }) => (p.isReply ? "0" : "0.9rem")};
  }

  & .btn-box {
    display: flex;
    justify-content: flex-end;
    padding: 0.8em 0.4em;
    & button {
      min-width: 6em;
    }
  }

  /* Tooltip text */
  .start-tooltip + .tooltiptext {
    border-radius: 3px;
    background-color: #f4f6dd;
    font-size: 1em;
    padding: 0.6rem 1rem;
    position: absolute;
    left: 15em;
    text-align: center;
    visibility: hidden;
    z-index: 1;
  }

  .start-tooltip:focus + .tooltiptext {
    visibility: visible;
  }
`;
