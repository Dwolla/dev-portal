import renderer from "react-test-renderer";
import FilterTabs, { TabStyle } from "../FilterTabs";

const TABS = ["GET BUILDING", "PREREQUISITES", "FEATURES"];

test("FilterTabs", () => {
  const setState = jest.fn();
  const tree = renderer.create(
    <FilterTabs tabs={TABS} filter={null} setFilter={setState} />
  );
  tree.root.findAllByType(TabStyle).map((t) => t.props.onClick());

  expect(setState.mock.calls.map((c) => c)).toEqual(
    [null, ...TABS].map((t) => [t])
  );
  expect(tree.toJSON()).toMatchSnapshot();
});
