const withTypescript = require("@zeit/next-typescript");
const withCSS = require("@zeit/next-css");

if (typeof require !== "undefined") {
  require.extensions[".css"] = file => {};
}

module.exports = withTypescript(withCSS());
