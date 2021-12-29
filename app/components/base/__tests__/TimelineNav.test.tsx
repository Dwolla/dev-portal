import renderer from "react-test-renderer";
import TimelineNav from "../TimelineNav";

const steps = ["Create Transfer", "First Leg", "Second Leg", "Third Leg"];

test("TimelineNav", () => {
  const tree = renderer.create(<TimelineNav totalSteps={steps} />).toJSON();

  expect(tree).toMatchSnapshot();
});
