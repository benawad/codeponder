import * as React from "react";

import { storiesOf } from "@storybook/react";
import { Question } from ".";

storiesOf("Question", module).add("basic example", () => (
  <div style={{ display: "inline-block" }}>
    <Question
      id="dafs"
      text="i am a question body"
      codeSnippet="i am code"
      numReplies={14}
      createdAt="12/28/2018"
      path="/packages/server/package.json"
      creator={{
        id: "123",
        username: "bob",
        pictureUrl: "https://dummyimage.com/600x400/000/fff",
        bio: "I a m bio",
        accessToken: "adsfasd",
      }}
    />
  </div>
));
