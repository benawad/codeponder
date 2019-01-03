import * as React from "react";

import { storiesOf } from "@storybook/react";
import { BlueInput } from ".";

storiesOf("Blue Input", module).add("basic example", () => (
  <div style={{ display: "inline-block" }}>
    <BlueInput />
  </div>
));
