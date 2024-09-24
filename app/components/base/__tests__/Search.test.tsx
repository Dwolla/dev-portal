import renderer from "react-test-renderer";
import Search from "../Search";

test("Default Search", () => {
  const tree = renderer.create(<Search />).toJSON();

  expect(tree).toMatchSnapshot();
});
