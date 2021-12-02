import renderer from "react-test-renderer";
import FundFlowSelector from "../FundsFlowSelector";

test("FundFlowSelector", () => {
  const tree = renderer.create(<FundFlowSelector />).toJSON();

  expect(tree).toMatchSnapshot();
});
