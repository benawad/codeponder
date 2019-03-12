import { LineNumberStyle, styled } from "@codeponder/ui";
import "github-markdown-css/github-markdown.css";
import schema from "hast-util-sanitize/lib/github.json";
import React from "react";
import remark from "remark";
import remarkPing from "remark-ping";
import remark2react from "remark-react";
import { Node } from "unist";
import visit from "unist-util-visit";
import { getHighlightedCode } from "../../../../utils/highlightCode";

const HighlightCode = ({ children }: { children: string }): JSX.Element => {
  try {
    const { value, lang, meta } = JSON.parse(children);
    return <code>{getHighlightedCode(value, lang, parseInt(meta))}</code>;
  } catch (ex) {
    return <code>{children}</code>;
  }
};

const sanitize = {
  ...schema,
  attributes: {
    ...schema.attributes,
    a: [...schema.attributes.a, ["class", "ping ping-link"]],
  },
};

const setCodeProps = (): ((ast: Node[]) => void) => {
  return (ast: Node[]): void =>
    visit(
      ast,
      "code",
      (node: Node): void => {
        const { lang, meta, value } = node;
        node.value = JSON.stringify({ value, lang, meta });
      }
    );
};

const MarkdownContainer = styled("div")`
  & .ping-link {
    color: #24292e;
    font-weight: 600;
  }

  & .token.line-number {
    ${LineNumberStyle}
  }
`;

interface Props {
  text: string;
}

export const MarkdownRenderer: React.FC<Props> = ({ text }): JSX.Element => (
  <MarkdownContainer className="markdown-body">
    {
      remark()
        .use(remarkPing, {
          pingUsername: () => true,
          userURL: (username: string) => `https://github.com/${username}`,
        })
        .use(setCodeProps)
        .use(remark2react, {
          sanitize,
          remarkReactComponents: {
            code: HighlightCode,
          },
        })
        .processSync(text).contents
    }
  </MarkdownContainer>
);
