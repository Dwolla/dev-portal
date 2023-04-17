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
