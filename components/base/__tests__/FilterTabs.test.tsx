import renderer from "react-test-renderer";
import ReactTestUtils from "react-dom/test-utils";
import FilterTabs from "../FilterTabs";

test("Filter Tabs", () => {
  const setState = jest.fn();
  const tree = renderer
    .create(
      <FilterTabs
        tabs={["GET BUILDING", "PREREQUISITES", "FEATURES"]}
        filter={null}
        setFilter={setState}
      />
    )
    .toJSON();
  ReactTestUtils.Simulate.click(tree);
  expect(tree).toMatchSnapshot();
});
