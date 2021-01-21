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
        link={{ href: "https://www.dwolla.com", external: true }}
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
        link={{ href: "https://www.dwolla.com", external: true }}
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
      <Card centerAlign icon={icon} topic="topic" description="Description" />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("with Center Align and Link", () => {
  const tree = renderer
    .create(
      <Card
        link={{ href: "https://www.dwolla.com", external: true }}
        centerAlign
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
        centerAlign
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
        link={{ href: "https://www.dwolla.com", external: true }}
        centerAlign
        badge="BADGETEXT"
        icon={icon}
        topic="topic"
        description="Description"
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
