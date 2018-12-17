import * as React from "react"

import { storiesOf } from "@storybook/react"
import FolderTree from "."
import Button from "../Button"

storiesOf("FolderTree", module).add("basic example", () => (
  <FolderTree
    getLinkProps={() => {}}
    Link={Button}
    items={[
      {
        name: ".dockerignore",
        type: "blob",
      },
      {
        name: ".gitignore",
        type: "blob",
      },
      {
        name: "README.md",
        type: "blob",
      },
      {
        name: "lerna.json",
        type: "blob",
      },
      {
        name: "package.json",
        type: "blob",
      },
      {
        name: "packages",
        type: "tree",
      },
      {
        name: "yarn.lock",
        type: "blob",
      },
    ]}
  />
))
