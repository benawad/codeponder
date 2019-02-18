import React from "react";
import { CommandButton } from "./CommandButton";
import { CommandContainer, NavTab } from "./components";

export type Tab = "write" | "preview";

type ToolbarProps = {
  tab: Tab;
  isIE8: boolean;
  onCommand: (name: string) => void;
  handleTabChange: (tab: Tab) => void;
};

export const Toolbar: React.FC<ToolbarProps> = React.memo(
  ({ tab, isIE8, onCommand, handleTabChange }) => (
    <div className="editor-header">
      {!isIE8 && (
        <CommandContainer className={`${tab !== "write" ? "hidden" : ""}`}>
          <div className="toolbar-group">
            <CommandButton onCommand={onCommand} name="header_text" />
            <CommandButton onCommand={onCommand} name="bold_text" />
            <CommandButton onCommand={onCommand} name="italic_text" />
          </div>
          <div className="toolbar-group">
            <CommandButton onCommand={onCommand} name="insert_quote" />
            <CommandButton onCommand={onCommand} name="insert_code" />
            <CommandButton onCommand={onCommand} name="insert_link" />
          </div>
          <div className="toolbar-group">
            <CommandButton onCommand={onCommand} name="bulleted_list" />
            <CommandButton onCommand={onCommand} name="numbered_list" />
            <CommandButton onCommand={onCommand} name="task_list" />
          </div>
        </CommandContainer>
      )}
      <nav className="editor-header-tabs">
        <NavTab
          type="button"
          className={`${tab === "write" ? "selected" : ""}`}
          onClick={() => handleTabChange("write")}
        >
          Write
        </NavTab>
        <NavTab
          type="button"
          className={`${tab === "preview" ? "selected" : ""}`}
          onClick={() => handleTabChange("preview")}
        >
          Preview
        </NavTab>
      </nav>
    </div>
  )
);
