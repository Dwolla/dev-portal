import renderer from "react-test-renderer";
import Banner from "../Banner";
import FilterTabs, { TabStyle } from "../FilterTabs";
import guideIcon from "../../assets/images/content-images/content-icons/guides-icon.svg";

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
        button={{
          text: "Discover the Possibilities",
          link: {
            href: "https://accounts-sandbox.dwolla.com/login",
            external: true,
          },
        }}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("Banner - with Extra Padding for Overlapping Cards", () => {
  const tree = renderer
    .create(
      <Banner
        topic="Comprehensive API documentation for developers and businesses."
        description="Step-by-step instructions to get you set up in the Dwolla API"
        button={{
          text: "Discover the Possibilities",
          link: {
            href: "https://accounts-sandbox.dwolla.com/login",
            external: true,
          },
        }}
        variant="overlapped"
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

const TABS = [
  { value: "all", label: "ALL" },
  { value: "get-building", label: "GET BUILDING" },
  { value: "prerequisites", label: "PREREQUISITES" },
  { value: "features", label: "FEATURES" },
];

test("Banner - with Filters", () => {
  const setState = jest.fn();
  const tree = renderer.create(
    <Banner
      icon={guideIcon}
      topic="Guides"
      description="Step-by-step instructions to get you set up in the Dwolla API"
      filterTabs={
        <FilterTabs tabs={TABS} filter={TABS[0]} setFilter={setState} />
      }
    />
  );
  tree.root.findAllByType(TabStyle).map((t) => t.props.onClick());

  expect(setState.mock.calls.map((c) => c)).toEqual([...TABS].map((t) => [t]));
  expect(tree.toJSON()).toMatchSnapshot();
});
