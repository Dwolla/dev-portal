import renderer from "react-test-renderer";
import Banner from "../Banner";
import FilterTabs, { TabStyle } from "../FilterTabs";
import guideIcon from "../../public/images/guides-icon-large.svg";

test("Default Banner", () => {
  const tree = renderer
    .create(
      <Banner
        icon={guideIcon}
        topic="Guides"
        description="Step-by-step instructions to get you set up in the Dwolla API"
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("Banner - no icon", () => {
  const tree = renderer
    .create(
      <Banner
        topic="Comprehensive API documentation for developers and businesses."
        description="Step-by-step instructions to get you set up in the Dwolla API"
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("Banner - with Button", () => {
  const tree = renderer
    .create(
      <Banner
        topic="Comprehensive API documentation for developers and businesses."
        description="Step-by-step instructions to get you set up in the Dwolla API"
        button={{ text: "Discover the Possibilities" }}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

const TABS = ["GET BUILDING", "PREREQUISITES", "FEATURES"];

test("Banner - with Filters", () => {
  const setState = jest.fn();
  const tree = renderer.create(
    <Banner
      icon={guideIcon}
      topic="Guides"
      description="Step-by-step instructions to get you set up in the Dwolla API"
      filterTabs={<FilterTabs tabs={TABS} filter={null} setFilter={setState} />}
    />
  );
  tree.root.findAllByType(TabStyle).map((t) => t.props.onClick());

  expect(setState.mock.calls.map((c) => c)).toEqual(
    [null, ...TABS].map((t) => [t])
  );
  expect(tree.toJSON()).toMatchSnapshot();
});
