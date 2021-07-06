import renderer from "react-test-renderer";
import HeroImage, { StyledHero } from "../HeroImage";

test("New Hero Image", () => {
  const tree = renderer.create(<HeroImage />).toJSON();

  expect(tree).toMatchSnapshot();
});

test("Style", () => {
  const tree = renderer.create(<StyledHero />).toJSON();
  expect(tree).toMatchSnapshot();
});
