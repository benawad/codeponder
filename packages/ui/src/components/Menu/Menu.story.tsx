import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Menu } from ".";

storiesOf("Menu", module).add("menu example", () => (
  <div style={{ display: "inline-block" }}>
    <div>
      <Menu
        options={["register", "login", "logout"]}
        renderOption={({ Anchor }) => Anchor}
      >
        <button>open menu</button>
      </Menu>
    </div>
    <div>hey</div>
  </div>
));
