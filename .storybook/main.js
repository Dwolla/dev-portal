const path = require("path");
const fs = require("fs");

module.exports = {
  core: {
    builder: "webpack5",
  },
  // import all files ending in *.stories.tsx or *.stories.mdx
  stories: ["../stories/**/*.stories.@(tsx|mdx)"],
  addons: [
    "@storybook/addon-viewport/register",
    "@storybook/addon-postcss",
    "@storybook/addon-backgrounds",
  ],
  framework: "@storybook/react",
};
