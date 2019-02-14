import styled from "styled-components";

export const FormRow = styled.div`
  padding: 1rem 0.9rem;
`;

export const Separator = styled.div`
  width: 100%
  height: 1;
  background: #f2f2f2;
`;

export const FormContainer = styled.form`
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
