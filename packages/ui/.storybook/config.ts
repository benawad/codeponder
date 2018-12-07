import { configure, addDecorator } from "@storybook/react";
import theme from "../src/theme";
import { withThemesProvider } from "storybook-addon-styled-component-theme";
// automatically import all files ending in *.stories.js
const req = require.context("../src", true, /.story.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

addDecorator(withThemesProvider([theme]));

configure(loadStories, module);
