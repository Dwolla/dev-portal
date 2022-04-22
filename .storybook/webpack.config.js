module.exports = ({ config }) => {
  config.module.rules.unshift({
    test: /\.svg$/,
    use: ["@svgr/webpack"],
  });
  return config;
};
