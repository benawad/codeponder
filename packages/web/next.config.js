const withTypescript = require("@zeit/next-typescript");
const withCSS = require("@zeit/next-css");
const withImages = require("next-images");

if (typeof require !== "undefined") {
  require.extensions[".css"] = file => {};
}

module.exports = withTypescript(withCSS(withImages()));
