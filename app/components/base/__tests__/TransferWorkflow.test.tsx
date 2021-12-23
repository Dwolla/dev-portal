import renderer from "react-test-renderer";
import TransferWorkflow from "../TransferWorkflow";

test("TransferWorkflow", () => {
  const tree = renderer.create(<TransferWorkflow />).toJSON();

  expect(tree).toMatchSnapshot();
});
