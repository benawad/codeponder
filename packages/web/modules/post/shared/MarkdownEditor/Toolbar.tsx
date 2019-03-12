import React from "react";
import { CommandButton } from "./CommandButton";
import { CommandContainer, NavTab } from "./components";

export type Tab = "write" | "preview";

interface ToolbarProps {
  tab: Tab;
  isIE8: boolean;
  onCommand: (name: string) => void;
  handleTabChange: (tab: Tab) => void;
}

export const Toolbar: React.FC<ToolbarProps> = React.memo(
  ({ tab, isIE8, onCommand, handleTabChange }) => (
    <div className="editor-header">
      {!isIE8 && (
        <CommandContainer className={`${tab !== "write" ? "hidden" : ""}`}>
          <div className="toolbar-group">
            <CommandButton onCommand={onCommand} name="headerText" />
            <CommandButton onCommand={onCommand} name="boldText" />
            <CommandButton onCommand={onCommand} name="italicText" />
          </div>
          <div className="toolbar-group">
            <CommandButton onCommand={onCommand} name="insertQuote" />
            <CommandButton onCommand={onCommand} name="insertCode" />
            <CommandButton onCommand={onCommand} name="insertLink" />
          </div>
          <div className="toolbar-group">
            <CommandButton onCommand={onCommand} name="bulletedList" />
            <CommandButton onCommand={onCommand} name="numberedList" />
            <CommandButton onCommand={onCommand} name="taskList" />
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
