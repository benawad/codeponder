import { configure } from "@storybook/react";

// automatically import all files ending in *.stories.js
const req = require.context("../src", true, /.story.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
