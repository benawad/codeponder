import * as React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { MyButton } from ".";

storiesOf("Button", module).add("basic example", () => (
  <MyButton variant="primary" onClick={action("primary-button-click")}>
    New code review
  </MyButton>
));
