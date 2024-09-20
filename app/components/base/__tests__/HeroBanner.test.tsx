import renderer from "react-test-renderer";
import HeroBanner from "../HeroBanner";
import hero from "../../../assets/images/content-images/hero-image-home.svg";

test("Default HeroBanner", () => {
  const tree = renderer
    .create(
      <HeroBanner
        heroImage={{
          src: hero,
          alt: "Some alt text",
        }}
        topic="Build with Dwolla"
        description="Documentation, tools and resources for developers to integrate Dwolla's account-to-account payments Platform."
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("HeroBanner - with SearchBar", () => {
  const tree = renderer
    .create(
      <HeroBanner
        heroImage={{
          src: hero,
          alt: "Some alt text",
        }}
        topic="Build with Dwolla"
        description="Documentation, tools and resources for developers to integrate Dwolla's account-to-account payments Platform."
        searchBar
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
