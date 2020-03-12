module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    "jest/globals": true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
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
    "comma-dangle": "off", // prettier
    indent: "off", // prettier
    "implicit-arrow-linebreak": "off",
    "import/extensions": "off", // webpack
    "import/no-unresolved": "off", // typescript
    "jsx-a11y/anchor-is-valid": "off", // next/link
    "operator-linebreak": "off", // prettier
    quotes: ["error", "double"],
    "react/destructuring-assignment": "off",
    "react/jsx-closing-tag-location": "off", // prettier
    "react/jsx-filename-extension": "off", // typescript
    "react/jsx-props-no-spreading": "off",
    "react/react-in-jsx-scope": "off", // next
    "react/self-closing-comp": "off", // prettier
    "spaced-comment": "off", // typescript
  },
};
