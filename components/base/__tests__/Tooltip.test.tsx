import renderer from "react-test-renderer";
import Tooltip from "../Tooltip";

// Creating a mock to bypass react-tippy breaking the test
jest.mock("react-tippy", () => ({
  Tooltip: jest.fn(({ children }) => <div>{children}</div>),
}));

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
