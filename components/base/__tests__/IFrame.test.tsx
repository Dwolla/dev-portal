import renderer from "react-test-renderer";
import IFrame from "../IFrame";

test("IFrame", () => {
  const tree = renderer
    .create(<IFrame src="https://go.dwolla.com/l/391342/2018-10-30/n92nqn" />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
