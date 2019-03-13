import { IconProps } from "@codeponder/ui";

interface CommandsMap {
  [key: string]: {
    label: string;
    className?: string;
    before: string;
    after?: string;
    newLine?: string;
    multiple?: true;
  };
}

export const commands: CommandsMap = {
  headerText: { label: "Add header text", before: "### " },
  boldText: { label: "Add bold text <ctrl+b>", before: "**", after: "**" },
  italicText: { label: "Add italic text <ctrl+i>", before: "_", after: "_" },
  insertQuote: {
    label: "Insert a quote",
    before: "> ",
    newLine: "\n",
    multiple: true,
  },
  insertCode: { label: "Insert code", before: "`", after: "`" },
  insertLink: { label: "Add a link <ctrl+k>", before: "[", after: "](url)" },
  bulletedList: {
    label: "Add a bulleted list",
    before: "- ",
    newLine: "\n",
    multiple: true,
  },
  numberedList: {
    label: "Add a numbered list",
    before: "%. ",
    newLine: "\n",
    multiple: true,
  },
  taskList: {
    label: "Add a task list",
    before: "- [ ] ",
    newLine: "\n",
    multiple: true,
  },
  mentionUser: {
    label: "Directly mention a user or team",
    className: "tooltipped-nw",
    before: "",
  },
  reference: {
    label: "Reference an issue or pull request",
    className: "tooltipped-nw",
    before: "",
  },
};

const executeCommand = (
  name: string,
  text: string,
  selectionStart: number | null,
  selectionEnd: number | null
): {
  newText: string;
  start: number;
  end: number;
} => {
  let { before, after = "", newLine = "", multiple = false } = commands[name];

  const start = selectionStart || 0;
  const end = selectionEnd || 0;
  const length = text.length;

  if (start === length) {
    const newLineBefore = start === 0 ? "" : newLine + newLine;
    const offset = (newLineBefore + before).length;
    const newText = text + newLineBefore + before.replace(/%/, "1") + after;
    return { newText, start: start + offset, end: end + offset };
  }

  let startIndex, endIndex;
  if (start === end) {
    const textStart = text.substring(0, start);
    const lineStart = textStart.lastIndexOf("\n") + 1;
    const sectionStart = textStart.lastIndexOf(" ") + 1;
    startIndex = Math.max(lineStart, sectionStart);
    const textEnd = text.substring(end) + "\n ";
    const lineEnd = textEnd.indexOf("\n");
    const sectionEnd = textEnd.indexOf(" ");
    endIndex = end + Math.min(lineEnd, sectionEnd);
  } else {
    startIndex = start;
    endIndex = end;
  }

  const first = text.substring(0, startIndex);
  const selection = text.substring(startIndex, endIndex);
  const rows = selection.split("\n");
  const last = text.substring(endIndex);

  if (name === "insertCode" && rows.length > 1) {
    before = "```\n";
    after = "\n```";
  }

  const newLineBefore =
    startIndex === 0
      ? ""
      : newLine + (first[first.length - 1] === newLine ? "" : newLine);

  const newLineAfter =
    endIndex === length ? "" : newLine + (last[0] === newLine ? "" : newLine);

  const offset = (newLineBefore + before).length;

  const middle = multiple
    ? rows
        .map((row, index) => before.replace(/%/, `${index + 1}`) + row)
        .join("\n")
    : before + selection;

  const startText = first + newLineBefore + middle;
  const newText = startText + after + newLineAfter + last;

  if (name === "insertLink") {
    return { newText, start: startText.length + 2, end: startText.length + 5 };
  }

  return {
    newText,
    start: start + (multiple && rows.length > 1 ? 0 : offset),
    end: end + offset * (multiple ? rows.length : 1),
  };
};

export const keyBoardCommands = (
  e: React.KeyboardEvent
): IconProps["name"] | "" => {
  const control = !e.altKey && (e.ctrlKey || e.metaKey);
  if (control) {
    switch (e.keyCode) {
      case 66: // 'b' Add bold text
        return "boldText";
      case 73: // 'i' Add italic text
        return "italicText";
      case 75: // 'k' Add a link
        return "insertLink";
      default:
        break;
    }
  }
  return "";
};

export interface EditCommand {
  target: {
    name: string;
    value: string;
  };
}

export const commandsHandler = (
  name: string,
  textarea: HTMLTextAreaElement,
  textChange: (c: EditCommand) => void
): void => {
  const { value: text, selectionStart, selectionEnd } = textarea;
  const { newText, start, end } = executeCommand(
    name,
    text,
    selectionStart,
    selectionEnd
  );

  textChange({ target: { name: "text", value: newText } });
  textarea.selectionStart = start;
  textarea.selectionEnd = end;
  textarea.focus();
  textarea.style.height = textarea.scrollHeight + 2 + "px";
};
