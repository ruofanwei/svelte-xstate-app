module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
    allowImportExportEverywhere: true,
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },

  plugins: ["svelte3"],
  ignorePatterns: ["public/build/"],
  overrides: [
    {
      files: ["**/*.svelte"],
      processor: "svelte3/svelte3",
    },
  ],
  extends: "eslint:recommended",
  rules: {
    indent: ["error", 2],
    quotes: ["error", "double"],
    semi: ["error", "never"],
  },
  settings: {
    // ...
  },
};
