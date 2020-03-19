import renderer from "react-test-renderer";
import Badge from "../Badge";

test("Badge", () => {
  const tree = renderer.create(<Badge text="BADGETEXT" />).toJSON();

  expect(tree).toMatchSnapshot();
});
