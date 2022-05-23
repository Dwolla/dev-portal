const path = require("path");
const fs = require("fs");

function getPackageDir(filepath) {
  let currDir = path.dirname(require.resolve(filepath));
  while (true) {
    if (fs.existsSync(path.join(currDir, "package.json"))) {
      return currDir;
    }
    const { dir, root } = path.parse(currDir);
    if (dir === root) {
      throw new Error(
        `Could not find package.json in the parent directories starting from ${filepath}.`
      );
    }
    currDir = dir;
  }
}

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
  // create alias to resolve emotion modules that were renamed in emotion 11
  webpackFinal: async (config) => {
    config.resolve.alias["@emotion/core"] = getPackageDir("@emotion/react");
    config.resolve.alias["@emotion/styled"] = getPackageDir("@emotion/styled");
    config.resolve.alias["emotion-theming"] = getPackageDir("@emotion/react");
    return config;
  },
};
