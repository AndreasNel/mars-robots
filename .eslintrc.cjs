module.exports = {
  extends: ["airbnb-base", "prettier"],
  env: {
    browser: false,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2024,
    sourceType: "module",
  },
  rules: {
    "import/extensions": ["error", "ignorePackages"],
  },
  overrides: [
    {
      files: ["test/**/*.js"],
      rules: {
        "max-classes-per-file": "off",
      },
    },
  ],
};
