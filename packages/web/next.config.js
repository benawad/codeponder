const withTypescript = require("@zeit/next-typescript");
const withCSS = require("@zeit/next-css");
const withTM = require("next-plugin-transpile-modules");

if (typeof require !== "undefined") {
  require.extensions[".css"] = file => {};
}

module.exports = withTypescript(
  withCSS(
    withTM({
      transpileModules: ["ui", "common"],
    })
  )
);
