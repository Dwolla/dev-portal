import renderer from "react-test-renderer";
import Tooltip from "../tooltip/Tooltip";

test("Tooltip", () => {
  const tree = renderer
    .create(
      <Tooltip
        text="This is a tooltip"
        hasArrow
        position="bottom"
        distance={11}
      >
        This is an element.
      </Tooltip>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
