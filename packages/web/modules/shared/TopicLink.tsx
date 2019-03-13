import { Topic } from "@codeponder/ui";
import Link from "next/link";
import * as React from "react";

export const TopicLink: React.FC<{ topic: string }> = ({
  topic,
}): JSX.Element => {
  return (
    <Link href={{ pathname: "/", query: { topic } }}>
      <a style={{ marginRight: "1rem" }}>
        <Topic>{topic}</Topic>
      </a>
    </Link>
  );
};
