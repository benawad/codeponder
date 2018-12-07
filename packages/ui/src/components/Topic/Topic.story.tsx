import * as React from "react";

import { storiesOf } from "@storybook/react";
import Topic from ".";

storiesOf("Topic", module)
  .add("single topic", () => <Topic>Python</Topic>)
  .add("multiple topics", () => (
    <div>
      <Topic>Python</Topic>
      <Topic>TypeScript</Topic>
      <Topic>JavaScript</Topic>
      <Topic>R</Topic>
      <Topic>Kobal</Topic>
    </div>
  ));
