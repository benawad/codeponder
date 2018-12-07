import * as React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Button from ".";

storiesOf("Button", module).add("basic example", () => (
  <Button variant="primary" onClick={action("primary-button-click")}>
    New code review
  </Button>
));
