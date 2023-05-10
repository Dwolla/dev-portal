module.exports = {
  // import all files ending in *.stories.tsx or *.stories.mdx
  addons: [
    "@storybook/addon-viewport/register",
    "@storybook/addon-postcss",
    "@storybook/addon-backgrounds",
  ],
  docs: {
    autodocs: true,
  },
  features: {
    storyStoreV7: false,
  },
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  stories: ["../stories/**/*.stories.@(tsx|mdx)"],
  webpackFinal: (config) => {
    const everyRule = (filePaths, ruleTest) =>
      filePaths.map((filePath) => ruleTest.test(filePath)).every(Boolean);
    const fileLoaderRule = config.module.rules.find(
      (rule) =>
        rule.test && everyRule([".png", ".jpg", ".jpeg", ".svg"], rule.test)
    );
    fileLoaderRule.exclude = /\.(png|jpeg?|svg)$/;
    config.module.rules.push(
      {
        test: /\.(png|jpeg?)$/,
        use: ["url-loader"],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "url-loader"],
      }
    );
    return config;
  },
};
