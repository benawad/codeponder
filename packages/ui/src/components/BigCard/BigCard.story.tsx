import * as React from "react";

import { storiesOf } from "@storybook/react";
import { BigCard } from ".";
import { Wrapper } from "../Wrapper";

storiesOf("BigCard", module).add("basic example", () => (
  <Wrapper>
    <BigCard>i am content</BigCard>
  </Wrapper>
));
