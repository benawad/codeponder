import * as React from "react";

import { storiesOf } from "@storybook/react";
import { QuestionCard } from ".";
import Button from "../Button";

storiesOf("Question Card", module).add("basic example", () => (
  <div style={{ display: "inline-block" }}>
    <QuestionCard
      id="12"
      text="when should I use pkg?"
      repo="codeponder"
      username="benawad"
      programmingLanguage="typescript"
      path="package.json"
      creator={{
        id: "1",
        username: "benawad",
        pictureUrl: "https://dummyimage.com/600x400/000/fff",
      }}
      Link={Button}
      getLinkProps={() => ({})}
    />
  </div>
));
