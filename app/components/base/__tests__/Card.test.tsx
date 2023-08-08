import renderer from "react-test-renderer";
import Card from "../Card";
import icon from "../../../assets/images/content-images/content-icons/guides-icon.svg";

test("default", () => {
  const tree = renderer
    .create(<Card icon={icon} topic="topic" description="Description" />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("with Link", () => {
  const tree = renderer
    .create(
      <Card
        links={[
          {
            href: "https://www.dwolla.com",
            text: "Learn More",
            external: true,
          },
        ]}
        icon={icon}
        topic="topic"
        description="Description"
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("with Badge", () => {
  const tree = renderer
    .create(
      <Card
        badge="BADGETEXT"
        icon={icon}
        topic="topic"
        description="Description"
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("with Link and Badge", () => {
  const tree = renderer
    .create(
      <Card
        links={[
          {
            href: "https://www.dwolla.com",
            text: "Learn More",
            external: true,
          },
        ]}
        badge="BADGETEXT"
        icon={icon}
        topic="topic"
        description="Description"
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("with Center Align", () => {
  const tree = renderer
    .create(
      <Card
        horizontalCenterAlign
        icon={icon}
        topic="topic"
        description="Description"
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("with Center Align and Link", () => {
  const tree = renderer
    .create(
      <Card
        links={[
          {
            href: "https://www.dwolla.com",
            text: "Learn More",
            external: true,
          },
        ]}
        horizontalCenterAlign
        icon={icon}
        topic="topic"
        description="Description"
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("with Center Align and Badge", () => {
  const tree = renderer
    .create(
      <Card
        horizontalCenterAlign
        badge="BADGETEXT"
        icon={icon}
        topic="topic"
        description="Description"
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("with Center Align, Link and Badge", () => {
  const tree = renderer
    .create(
      <Card
        links={[
          {
            href: "https://www.dwolla.com",
            text: "Learn More",
            external: true,
          },
        ]}
        horizontalCenterAlign
        badge="BADGETEXT"
        icon={icon}
        topic="topic"
        description="Description"
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("with Flex", () => {
  const tree = renderer
    .create(<Card isFlex icon={icon} topic="topic" description="Description" />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("with Flex and Badge", () => {
  const tree = renderer
    .create(
      <Card
        isFlex
        badge="BADGETEXT"
        icon={icon}
        topic="topic"
        description="Description"
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("with Flex, Link and Badge", () => {
  const tree = renderer
    .create(
      <Card
        links={[
          {
            href: "https://www.dwolla.com",
            text: "Learn More",
            external: true,
          },
        ]}
        isFlex
        badge="BADGETEXT"
        icon={icon}
        topic="topic"
        description="Description"
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("with Languages", () => {
  const tree = renderer
    .create(
      <Card
        links={[
          {
            href: "https://www.dwolla.com",
            text: "Github Repository",
            external: true,
          },
        ]}
        topic="topic"
        description="Description"
        languages={[
          "CSS",
          "handlebars",
          "HTML",
          "Java",
          "JavaScript",
          "kotlin",
          "php",
          "Python",
          "ruby",
          "shell",
          "TypeScript",
        ]}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
