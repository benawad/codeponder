import toH from "hast-to-hyperscript";
import React from "react";
import refractor, { RefractorNode } from "refractor";
import rehype from "rehype";

const lineNumber = (lineNum: number): RefractorNode => ({
  type: "element",
  tagName: "span",
  properties: { className: ["token", "line-number"] },
  children: [{ type: "text", value: `${lineNum}` }],
});

const addLineNumber = (
  ast: RefractorNode[],
  lineNum: number,
  root = true
): {
  nodes: RefractorNode[];
  lineNum: number;
} => {
  const nodes: RefractorNode[] = root ? [lineNumber(lineNum++)] : [];
  ast.forEach(node => {
    if (node.type === "text" && node.value && node.value.includes("\n")) {
      const lines = node.value.split("\n");
      const lastLine = lines.pop();
      for (const line of lines) {
        nodes.push({ type: "text", value: `${line}\n` });
        nodes.push(lineNumber(lineNum++));
      }
      if (lastLine) {
        nodes.push({ type: "text", value: lastLine });
      }
    } else {
      if (node.type == "element" && node.children) {
        const result = addLineNumber(node.children, lineNum, false);
        node.children = result.nodes;
        lineNum = result.lineNum;
      }
      nodes.push(node);
    }
  });
  return { nodes, lineNum };
};

const getHast = (code: string, lang: string): RefractorNode[] | null => {
  if (!lang) return null;
  if (!refractor.registered(lang)) {
    try {
      refractor.register(require(`refractor/lang/${lang}.js`));
    } catch (ex) {}
  }
  if (refractor.registered(lang)) {
    return refractor.highlight(code, lang);
  }
  return null;
};

export const getHighlightedCode = (
  code: string,
  lang: string,
  firstLineNum: number
): React.ReactNode[] | string => {
  let ast = getHast(code, lang);
  if (ast) {
    if (!isNaN(firstLineNum)) {
      ast = addLineNumber(ast, firstLineNum || 1).nodes;
    }
    const root = toH(React.createElement, { type: "root", children: ast });
    return root.props.children;
  }
  return code;
};

export const getHighlightedHTML = (code: string, lang: string): string => {
  const ast = getHast(code, lang);
  if (ast) {
    return rehype()
      .stringify({ type: "root", children: ast })
      .toString();
  }
  return code;
};
