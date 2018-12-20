import * as React from "react";

import { storiesOf } from "@storybook/react";
import { PostRow } from ".";
import { MyButton } from "../MyButton";

storiesOf("Post Row", module).add("basic example", () => (
  <div style={{ display: "inline-block" }}>
    <PostRow
      id="12"
      title="i am a title"
      createdAt={new Date()}
      numQuestions={5}
      commitId=""
      repo="codeponder"
      repoOwner="benawad"
      topics={["typescript", "react", "node"]}
      creator={{
        id: "1",
        username: "benawad",
        pictureUrl: "https://dummyimage.com/600x400/000/fff",
      }}
      Link={MyButton}
      getLinkProps={() => ({})}
    />
  </div>
));
