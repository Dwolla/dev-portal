import renderer from "react-test-renderer";
import TimelineNav from "../TimelineNav";

const steps = ["Create Transfer", "First Leg", "Second Leg", "Third Leg"];

test("TimelineNav", () => {
  const setState = jest.fn();
  const tree = renderer
    .create(<TimelineNav totalSteps={steps} active={0} setActive={setState} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
