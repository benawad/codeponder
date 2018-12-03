import * as React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Button } from ".";

storiesOf("Welcome", module).add("to Storybook", () => <div>welcome!</div>);

storiesOf("Button", module)
  .add("with text", () => <button>text</button>)
  .add("with some emoji", () => (
    <Button onClick={action("clicked")}>
      <span role="img" aria-label="so cool">
        hey
      </span>
    </Button>
  ));
