module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    "jest/globals": true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:storybook/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "jest"],
  rules: {
    "arrow-body-style": "off",
    "comma-dangle": "off",
    // prettier
    "function-paren-newline": "off",
    // prettier
    indent: "off",
    // prettier
    "implicit-arrow-linebreak": "off",
    "import/extensions": "off",
    // webpack
    "import/no-unresolved": "off",
    // typescript
    "jsx-a11y/anchor-is-valid": "off",
    // next/link
    "no-confusing-arrow": "off",
    // prettier
    "no-undef": "off",
    //typescript
    "nonblock-statement-body-position": "off",
    // prettier
    "object-curly-newline": "off",
    // prettier
    "operator-linebreak": "off",
    // prettier
    quotes: "off",
    // prettier
    "react/destructuring-assignment": "off",
    "react/jsx-closing-tag-location": "off",
    // prettier
    "react/jsx-filename-extension": "off",
    // typescript
    "react/jsx-one-expression-per-line": "off",
    // prettier
    "react/jsx-props-no-spreading": "off",
    "react/jsx-wrap-multilines": "off",
    // prettier
    "react/jsx-no-bind": "off",
    // typescript
    "react/jsx-no-constructed-context-values": "off",
    // typescript
    "react/no-children-prop": "off",
    // typescript
    "react/no-unstable-nested-components": "off",
    "react/no-unused-prop-types": "off",
    // typescript
    "react/react-in-jsx-scope": "off",
    // next
    "react/require-default-props": "off",
    //typescript
    "react/self-closing-comp": "off",
    // prettier
    "spaced-comment": "off", // typescript
  },
};
