import renderer from "react-test-renderer";
import Card from "../Card";
import icon from "../../public/images/guides-icon-large.svg";

test("default", () => {
  const tree = renderer
    .create(<Card icon={icon} topic="topic" description="Description" />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("with Link", () => {
  const tree = renderer
    .create(<Card link icon={icon} topic="topic" description="Description" />)
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
        link
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
        link
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
        link
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
