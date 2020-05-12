import renderer from "react-test-renderer";
import Badge from "../Badge";

test("Badge", () => {
  const tree = renderer.create(<Badge text="BADGETEXT" />).toJSON();

  expect(tree).toMatchSnapshot();
});

test("with variant", () => {
  const tree = renderer.create(<Badge text="3" variant="orange" />).toJSON();

  expect(tree).toMatchSnapshot();
});
