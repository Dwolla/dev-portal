import renderer from "react-test-renderer";
import HeroImage from "../HeroImage";
import hero from "../../../../assets/images/content-images/hero-image-drop-ins.png";

test("New Hero Image", () => {
  const tree = renderer
    .create(
      <HeroImage
        heroImage={{
          src: hero,
          alt: "Some alt text",
        }}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
