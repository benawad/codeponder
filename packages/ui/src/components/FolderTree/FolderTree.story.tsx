import * as React from "react";

import { storiesOf } from "@storybook/react";
import FolderTree from ".";

storiesOf("FolderTree", module).add("basic example", () => (
  <FolderTree
    onItemPress={() => {}}
    items={[
      {
        path: ".dockerignore",
        type: "blob",
        url:
          "https://api.github.com/repos/benawad/codeponder/git/blobs/1064fe98559c4eeedb7108d57c1119aecba7c6fb"
      },
      {
        path: ".gitignore",
        type: "blob",
        url:
          "https://api.github.com/repos/benawad/codeponder/git/blobs/8b467557dca4fd4b61160b2168d852ed975ddc3f"
      },
      {
        path: "README.md",
        type: "blob",
        url:
          "https://api.github.com/repos/benawad/codeponder/git/blobs/c13157a0863de204cd694136af37dd5589db88ee"
      },
      {
        path: "lerna.json",
        type: "blob",
        url:
          "https://api.github.com/repos/benawad/codeponder/git/blobs/da876e94fc360267a850182aa45d2b56b058cae9"
      },
      {
        path: "package.json",
        type: "blob",
        url:
          "https://api.github.com/repos/benawad/codeponder/git/blobs/1d57cd73e2cd1d6ecb6ddbf426f2c5be418e972d"
      },
      {
        path: "packages",
        type: "tree",
        url:
          "https://api.github.com/repos/benawad/codeponder/git/trees/334ca673518b5f31172c811c5b28de42f62e966a"
      },
      {
        path: "yarn.lock",
        type: "blob",
        url:
          "https://api.github.com/repos/benawad/codeponder/git/blobs/bd8ca4ac16aff74bb4cc6cbff2b2936e8ad58d6f"
      }
    ]}
  />
));
