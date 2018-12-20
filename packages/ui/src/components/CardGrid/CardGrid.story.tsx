import * as React from "react";

import { storiesOf } from "@storybook/react";
import { CardGrid } from ".";
import { MyButton } from "../MyButton";
import { PostCard } from "../PostCard";

storiesOf("Card Grid", module).add("basic example", () => (
  <div style={{ display: "inline-block" }}>
    <CardGrid>
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <PostCard
            key={i}
            title="i am a title"
            id="12"
            commitId=""
            repo="codeponder"
            repoOwner="benawad"
            topics={["typescript"]}
            creator={{
              id: "1",
              username: "benawad",
              pictureUrl: "https://dummyimage.com/600x400/000/fff",
            }}
            Link={MyButton}
            getLinkProps={() => ({})}
          />
        ))}
    </CardGrid>
  </div>
));
