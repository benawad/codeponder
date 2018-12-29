import * as React from "react";

import { storiesOf } from "@storybook/react";
import { Input } from ".";

storiesOf("Input", module).add("basic example", () => (
  <div style={{ display: "inline-block" }}>
    <Input icon="search" />
  </div>
));
