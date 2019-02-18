type CommandsMap = {
  [key: string]: {
    label: string;
    className?: string;
    before: string;
    after?: string;
    newLine?: string;
    multiple?: true;
  };
};

export const commands: CommandsMap = {
  header_text: { label: "Add header text", before: "### " },
  bold_text: { label: "Add bold text <ctrl+b>", before: "**", after: "**" },
  italic_text: { label: "Add italic text <ctrl+i>", before: "_", after: "_" },
  insert_quote: {
    label: "Insert a quote",
    before: "> ",
    newLine: "\n",
    multiple: true,
  },
  insert_code: { label: "Insert code", before: "`", after: "`" },
  insert_link: { label: "Add a link <ctrl+k>", before: "[", after: "](url)" },
  bulleted_list: {
    label: "Add a bulleted list",
    before: "- ",
    newLine: "\n",
    multiple: true,
  },
  numbered_list: {
    label: "Add a numbered list",
    before: "%. ",
    newLine: "\n",
    multiple: true,
  },
  task_list: {
    label: "Add a task list",
    before: "- [ ] ",
    newLine: "\n",
    multiple: true,
  },
  mention_user: {
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
) => {
  let { before, after = "", newLine = "", multiple = false } = commands[name];

  const start = selectionStart || 0;
  const end = selectionEnd || 0;
  const length = text.length;

  if (start == length) {
    const newLineBefore = start == 0 ? "" : newLine + newLine;
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

  if (name == "insert_code" && rows.length > 1) {
    before = "```\n";
    after = "\n```";
  }

  const newLineBefore =
    startIndex == 0
      ? ""
      : newLine + (first[first.length - 1] == newLine ? "" : newLine);

  const newLineAfter =
    endIndex == length ? "" : newLine + (last[0] == newLine ? "" : newLine);

  const offset = (newLineBefore + before).length;

  const middle = multiple
    ? rows
        .map((row, index) => before.replace(/%/, `${index + 1}`) + row)
        .join("\n")
    : before + selection;

  const startText = first + newLineBefore + middle;
  const newText = startText + after + newLineAfter + last;

  if (name == "insert_link") {
    return { newText, start: startText.length + 2, end: startText.length + 5 };
  }

  return {
    newText,
    start: start + (multiple && rows.length > 1 ? 0 : offset),
    end: end + offset * (multiple ? rows.length : 1),
  };
};

export const keyBoardCommands = (e: React.KeyboardEvent) => {
  const control = !e.altKey && (e.ctrlKey || e.metaKey);
  if (control) {
    switch (e.keyCode) {
      case 66: // 'b' Add bold text
        return "bold_text";
      case 73: // 'i' Add italic text
        return "italic_text";
      case 75: // 'k' Add a link
        return "insert_link";
    }
  }
  return "";
};

export const commandsHandler = (
  name: string,
  textarea: HTMLTextAreaElement,
  textChange: (e: any) => void
) => {
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
