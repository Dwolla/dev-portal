const withDwollaMdx = require("dwolla-mdx-remark");
const withImages = require("next-images");
const withYaml = require("next-plugin-yaml");

module.exports = () =>
  withYaml(
    withImages(
      withDwollaMdx({
        extension: /\.mdx?$/,
        options: {
          providerImportSource: "@mdx-js/react",
        },
      })({
        compiler: {
          emotion: true,
        },
        experimental: {
          swcPlugins: [["WASM_TARGET", {}]],
        },
        images: {
          disableStaticImages: true,
        },
        pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
        typescript: {
          ignoreBuildErrors: true,
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
