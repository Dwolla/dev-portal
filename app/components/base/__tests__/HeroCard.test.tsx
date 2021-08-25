import renderer from "react-test-renderer";
import HeroCard from "../HeroCard";

test("Default HeroCard", () => {
  const tree = renderer
    .create(
      <HeroCard
        topic="Save development time with Drop-in Components"
        description="Integrate with the Dwolla API with just a few lines of code "
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("HeroCard - with Button", () => {
  const tree = renderer
    .create(
      <HeroCard
        topic="Save development time with Drop-in Components"
        description="Integrate with the Dwolla API with just a few lines of code "
        button={{
          text: "View Walkthrough Guide",
          link: {
            href: "https://www.dwolla.com",
            external: false,
          },
        }}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("HeroCard - with Links", () => {
  const tree = renderer
    .create(
      <HeroCard
        topic="Save development time with Drop-in Components"
        description="Integrate with the Dwolla API with just a few lines of code "
        links={[
          {
            text: "Technical Documentation",
            href: "https://www.dwolla.com",
            external: false,
          },
          {
            text: "Learn about the components",
            href: "https://www.dwolla.com",
            external: true,
          },
        ]}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("HeroCard - with Button and Links", () => {
  const tree = renderer
    .create(
      <HeroCard
        topic="Save development time with Drop-in Components"
        description="Integrate with the Dwolla API with just a few lines of code "
        button={{
          text: "View Walkthrough Guide",
          link: {
            href: "https://www.dwolla.com",
            external: false,
          },
        }}
        links={[
          {
            text: "Technical Documentation",
            href: "https://www.dwolla.com",
            external: false,
          },
          {
            text: "Learn about the components",
            href: "https://www.dwolla.com",
            external: true,
          },
        ]}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
