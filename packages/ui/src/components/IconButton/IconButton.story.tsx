import * as React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { IconButton } from ".";

storiesOf("Button", module).add("Button with svg icon", () => (
  <>
    <IconButton
      variant="primary"
      icon="plus"
      onClick={action("primary-button-click")}
    />

    <div style={{ display: "flex", alignItems: "center" }}>
      IconButton with class hidden only visible when hovered -->
      <div style={{ border: "1px solid #b3b3b3" }}>
        <IconButton
          className="hidden"
          variant="primary"
          icon="plus"
          onClick={action("primary-button-click")}
        />
      </div>
    </div>
  </>
));
