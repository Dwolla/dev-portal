const importAllImagesFromContext = (r) => {
  const images = {};
  r.keys().forEach((filename) => {
    images[filename.replace("./", "")] = r(filename);
  });
  return images;
};

export const contentIcons = importAllImagesFromContext(
  require.context("../assets/images/content-icons", false, /\.(png|jpe?g|svg)$/)
);

export default importAllImagesFromContext;
