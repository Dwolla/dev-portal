// next.config.js
const withMdxEnhanced = require("next-mdx-enhanced");
const withImages = require("next-images");
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const withYaml = require("next-plugin-yaml");

module.exports = (phase) =>
  withYaml(
    withImages(
      withMdxEnhanced({
        layoutPath: "code/components/layouts",
        defaultLayout: true,
        // fileExtensions: ['mdx'],
        // remarkPlugins: [],
        // rehypePlugins: [],
        // extendFrontMatter: {
        //   process: (mdxContent, frontMatter) => {},
        //   phase: 'prebuild|loader|both'
        // }
      })({
        target: "serverless",
        env: {
          isDev: phase === PHASE_DEVELOPMENT_SERVER,
        },
        webpack: (config) => {
          config.module.rules.unshift({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
          });
          return config;
        },
      })
    )
  );
