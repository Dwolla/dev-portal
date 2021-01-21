import renderer from "react-test-renderer";
import FilterTabs, { TabStyle } from "../FilterTabs";

const TABS = [
  { value: "all", label: "ALL" },
  { value: "get-building", label: "GET BUILDING" },
  { value: "prerequisites", label: "PREREQUISITES" },
  { value: "features", label: "FEATURES" },
];

test("default", () => {
  const setState = jest.fn();
  const tree = renderer.create(
    <FilterTabs tabs={TABS} filter={TABS[0]} setFilter={setState} />
  );
  tree.root.findAllByType(TabStyle).map((t) => t.props.onClick());

  expect(setState.mock.calls.map((c) => c)).toEqual([...TABS].map((t) => [t]));
  expect(tree.toJSON()).toMatchSnapshot();
});

test("sidebar", () => {
  const setState = jest.fn();
  const tree = renderer.create(
    <FilterTabs
      tabs={TABS}
      filter={TABS[0]}
      setFilter={setState}
      variant="sidebar"
    />
  );
  tree.root.findAllByType(TabStyle).map((t) => t.props.onClick());

  expect(setState.mock.calls.map((c) => c)).toEqual([...TABS].map((t) => [t]));
  expect(tree.toJSON()).toMatchSnapshot();
});
