import * as React from "react";

import { storiesOf } from "@storybook/react";
import { CardGrid } from ".";
import { QuestionCard } from "../QuestionCard";

storiesOf("Card Grid", module).add("basic example", () => (
  <div style={{ display: "inline-block" }}>
    <CardGrid>
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <QuestionCard
            key={i}
            id="12"
            text="when should I use pkg?"
            repo="codeponder"
            username="benawad"
            programmingLanguage="typescript"
            creator={{
              id: "1",
              username: "benawad",
              pictureUrl: "https://dummyimage.com/600x400/000/fff",
            }}
          />
        ))}
    </CardGrid>
  </div>
));
