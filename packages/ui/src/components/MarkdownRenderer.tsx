import "github-markdown-css/github-markdown.css";
import schema from "hast-util-sanitize/lib/github.json";
import React from "react";
import remark from "remark";
import remarkPing from "remark-ping";
import remark2react from "remark-react";

const sanitize = {
  ...schema,
  attributes: {
    ...schema.attributes,
    a: [...schema.attributes.a, ["class", "ping ping-link"]],
  },
};

export const MarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="markdown-body">
      {
        remark()
          .use(remarkPing, {
            pingUsername: () => true,
            userURL: () => `#`,
          })
          .use(remark2react, {
            sanitize,
          })
          .processSync(text).contents
      }
    </div>
  );
};
