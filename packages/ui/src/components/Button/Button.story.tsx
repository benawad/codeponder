import * as React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Button } from ".";

storiesOf("Button", module)
  .add("with text", () => <Button>text</Button>)
  .add("with some emoji", () => (
    <Button onClick={action("clicked")}>
      <span role="img" aria-label="so cool">
        hey
      </span>
    </Button>
  ));
