import * as React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Topic } from ".";

storiesOf("Topic", module)
  .add("single topic", () => (
    <Topic onClick={action("single-topic-click")}>Python</Topic>
  ))
  .add("multiple topics", () => (
    <div>
      <Topic onClick={action("python-topic-click")}>Python</Topic>
      <Topic onClick={action("typescript-topic-click")}>TypeScript</Topic>
      <Topic onClick={action("javascript-topic-click")}>JavaScript</Topic>
      <Topic onClick={action("r-topic-click")}>R</Topic>
      <Topic onClick={action("kobal-topic-click")}>Kobal</Topic>
    </div>
  ));
