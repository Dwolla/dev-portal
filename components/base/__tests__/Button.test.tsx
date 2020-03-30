import renderer from "react-test-renderer";
import Button from "../Button";

test("Button", () => {
  const tree = renderer
    .create(<Button text="Button" size="standard" variant="primary" />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
