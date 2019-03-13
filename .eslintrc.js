module.exports = {
  root: true,

  parser: "@typescript-eslint/parser",

  plugins: ["@typescript-eslint"],

  extends: [
    "react-app",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint"
  ],

  env: {
    es6: true,
    node: true,
  },

  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2018,
  },

  rules: {
    "jsx-a11y/anchor-is-valid": "off",
    "@typescript-eslint/explicit-member-accessibility": "off"
  },

  globals: {},
};
