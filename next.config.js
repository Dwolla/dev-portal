const withDwollaMdx = require("dwolla-mdx-remark");
const withImages = require("next-images");
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const withYaml = require("next-plugin-yaml");

module.exports = (phase) =>
  withYaml(
    withImages(
      withDwollaMdx({
        extension: /\.mdx?$/,
        options: {
          providerImportSource: "@mdx-js/react",
        },
      })({
        env: {
          isDev: phase === PHASE_DEVELOPMENT_SERVER,
        },
        images: {
          disableStaticImages: true,
        },
        pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
        redirects: async () => [
          {
            source: "/",
            destination: "/docs",
            permanent: true,
          },
          {
            source: "/docs/connect/api-reference",
            destination: "/docs/connect/api-reference/api-fundamentals",
            permanent: true,
          },
          {
            source: "/docs/balance/api-reference",
            destination: "/docs/balance/api-reference/api-fundamentals",
            permanent: true,
          },
        ],
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
