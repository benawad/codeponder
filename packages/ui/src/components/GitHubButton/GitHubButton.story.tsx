import * as React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { GitHubButton } from ".";

storiesOf("Button", module).add("GitHub", () => (
  <GitHubButton onClick={action("primary-button-click")}>
    Sign in with GitHub
  </GitHubButton>
));
