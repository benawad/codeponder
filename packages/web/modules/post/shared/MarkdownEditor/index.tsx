import { MarkdownRenderer } from "@codeponder/ui";
import { Field } from "formik";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { CommentInputField } from "../../../shared/formik-fields/CommentInputField";
import { commandsHandler, keyBoardCommands } from "./commands";
import { EditorContainer } from "./components";
import { Tab, Toolbar } from "./Toolbar";

interface EditorProps {
  isReply: boolean;
  text: string;
  textChange: (e: any) => void;
}

let isIE8 = false;

export const MarkdownEditor: React.FC<EditorProps> = React.memo(
  ({ isReply, text, textChange }) => {
    const writeRef = useRef<HTMLTextAreaElement>(null);
    const [tab, setTab] = useState<Tab>("write");

    const handleTabChange = useCallback(async (newTab: Tab) => {
      if (newTab === "write") {
        await setTab("write");
        writeRef.current!.focus();
      } else {
        setTab("preview");
      }
    }, []);

    const handleCommand = useCallback((name: string) => {
      commandsHandler(name, writeRef.current!, textChange);
    }, []);

    const handleKeyCommand = useCallback((e: React.KeyboardEvent) => {
      const command = !isIE8 && keyBoardCommands(e);
      if (command) {
        handleCommand(command);
        e.preventDefault();
      }
    }, []);

    useLayoutEffect(() => {
      const textarea = writeRef.current!;
      // textarea selectionStart and selectionEnd does not exist on IE8
      isIE8 =
        typeof textarea.selectionStart !== "number" ||
        typeof textarea.selectionEnd !== "number";
    }, []);

    // dynamically set textarea height
    useEffect(() => {
      const textarea = writeRef.current!;
      textarea.style.height = "100px";
      textarea.style.height = writeRef.current!.scrollHeight + 2 + "px";
    }, [text]);

    return (
      <EditorContainer>
        <Toolbar
          tab={tab}
          isIE8={isIE8}
          onCommand={handleCommand}
          handleTabChange={handleTabChange}
        />
        <div className={`${tab === "write" ? "selected " : ""}write-content`}>
          <Field
            inputRef={writeRef}
            component={CommentInputField}
            autoFocus={isReply}
            minHeight="100px"
            name="text"
            placeholder={isReply ? "Type your Reply" : "Type your Question"}
            onKeyDown={handleKeyCommand}
            as="textarea"
          />
        </div>
        {tab === "preview" && (
          <div
            className="preview-content markdown-body selected"
            style={{
              minHeight: writeRef.current!.style.height || "100px",
            }}
          >
            <MarkdownRenderer text={text.trim() || "Nothing to preview"} />
          </div>
        )}
      </EditorContainer>
    );
  }
);
