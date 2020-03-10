// next.config.js
const withMdxEnhanced = require("next-mdx-enhanced");
const withImages = require("next-images");

module.exports = withImages(
  withMdxEnhanced({
    // layoutPath: 'layouts',
    // defaultLayout: true,
    // fileExtensions: ['mdx'],
    // remarkPlugins: [],
    // rehypePlugins: [],
    // extendFrontMatter: {
    //   process: (mdxContent, frontMatter) => {},
    //   phase: 'prebuild|loader|both'
    // }
  })({ target: "serverless" })
);
