/* eslint-disable @typescript-eslint/no-var-requires */
const withTypescript = require("@zeit/next-typescript");
const withCSS = require("@zeit/next-css");
const withImages = require("next-images");

if (typeof require !== "undefined") {
  require.extensions[".css"] = () => {};
}

module.exports = withTypescript(withCSS(withImages()));
