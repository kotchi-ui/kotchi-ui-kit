module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true,
    node: true,
    amd: true,
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
    ecmaFeatures: {
      experimentalDecorators: true,
    },
  },
  plugins: ["prettier"],
  extends: ["plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": "error",
  },
};
