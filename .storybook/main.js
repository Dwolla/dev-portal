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
  webpackFinal: (config) => {
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test(".svg")
    );
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack", "url-loader"],
    });
    return config;
  },
};
