import { styled } from "@codeponder/ui";

export const CommandContainer = styled.div`
  float: right;

  &.hidden {
    display: none;
  }

  .toolbar-group {
    display: inline-block;
    margin-left: 20px;

    & :first-child {
      margin-left: 0;
    }
  }

  & .toolbar-item {
    background: none;
    border: 0;
    color: #586069;
    display: block;
    float: left;
    padding: 4px 5px;

    :hover {
      color: #0366d6;
    }
  }

  & .tooltipped {
    position: relative;
    z-index: 10;

    ::before {
      border: 6px solid transparent;
      color: #1b1f23;
      content: "";
      display: none;
      height: 0;
      opacity: 0;
      pointer-events: none;
      position: absolute;
      width: 0;
      z-index: 1000001;
    }

    ::after {
      background: #1b1f23;
      border-radius: 3px;
      color: #fff;
      content: attr(aria-label);
      display: none;
      font: normal normal 11px/1.5 -apple-system, BlinkMacSystemFont, Segoe UI,
        Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji,
        Segoe UI Symbol;
      letter-spacing: normal;
      opacity: 0;
      padding: 0.5em 0.75em;
      pointer-events: none;
      position: absolute;
      text-align: center;
      text-decoration: none;
      text-shadow: none;
      text-transform: none;
      white-space: pre;
      word-wrap: break-word;
      z-index: 1000000;
    }

    :active::after,
    :active::before,
    :focus::after,
    :focus::before,
    :hover::after,
    :hover::before {
      animation-delay: 0.4s;
      animation-duration: 0.1s;
      animation-fill-mode: forwards;
      animation-name: tooltip-appear;
      animation-timing-function: ease-in;
      display: inline-block;
      text-decoration: none;
    }
  }

  @keyframes tooltip-appear {
    0% {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  & .tooltipped-n::before,
  & .tooltipped-ne::before,
  & .tooltipped-nw::before {
    border-top-color: #1b1f23;
    bottom: auto;
    margin-right: -6px;
    right: 50%;
    top: -7px;
  }

  & .tooltipped-n::after,
  & .tooltipped-n::after,
  & .tooltipped-s::after {
    transform: translateX(50%);
  }

  & .tooltipped-n::after,
  & .tooltipped-ne::after,
  & .tooltipped-nw::after {
    bottom: 100%;
    margin-bottom: 6px;
    right: 50%;
  }

  & .tooltipped-nw::after {
    right: -30%;
  }
`;

export const EditorContainer = styled.div`
  border-radius: inherit;

  & .editor-header {
    background-color: #f6f8fa;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    border-bottom: 1px solid #d1d5da;
    padding: 1rem 0.9rem 0 0.9rem;
    margin-bottom: 1rem;
    position: relative;

    & .editor-header-tabs {
      margin-bottom: -1px;
    }
  }

  & .write-content,
  & .preview-content {
    background-color: #ffffff;
    display: none;
    margin: 0 1rem;
  }

  & .write-content.selected,
  & .preview-content.selected {
    display: block;
  }

  & .preview-content {
    border: 1px solid transparent;
    border-bottom: 1px solid #d1d5da88;
    padding: 0.8rem;
    line-height: 1;

    /* move this part to a separate style */
    & ol,
    & ul,
    & dl {
      padding-left: 1.5em;
    }
  }

  & .write-content textarea {
    border: 1px solid #d1d5da88;
    min-height: 100px;
    padding: 0.8rem;
    resize: vertical;
  }
`;

export const NavTab = styled.button`
  appearance: none;
  background-color: transparent;
  border: 1px solid transparent;
  border-bottom: 0;
  color: #586069;
  cursor: pointer;
  display: inline-block;
  font-size: 1.4rem;
  line-height: 1.5;
  padding: 0.8rem 1.2rem;
  text-decoration: none;
  user-select: none;
  white-space: nowrap;

  &.selected {
    background-color: #ffffff;
    border-color: #d1d5da;
    border-radius: 3px 3px 0 0;
    color: #24292e;
  }
`;
