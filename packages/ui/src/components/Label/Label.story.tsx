import * as React from "react";

import { storiesOf } from "@storybook/react";
import { Label } from ".";

storiesOf("Label", module).add("basic example", () => (
  <div style={{ display: "inline-block" }}>
    <Label>Title</Label>
  </div>
));
