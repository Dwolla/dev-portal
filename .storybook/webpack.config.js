module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("babel-loader"),
    options: {
      presets: [require.resolve("babel-preset-react-app")],
    },
  });
  config.module.rules.unshift({
    test: /\.svg$/,
    use: ["@svgr/webpack"],
  });

  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};
