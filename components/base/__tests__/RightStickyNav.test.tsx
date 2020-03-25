import renderer from "react-test-renderer";
import RightStickyNav from "../RightStickyNav";

// Headings array to pass as props to RightStickyNav
const headings = [
  {
    key: "1",
    level: 1,
    title: "The Basics",
  },
  {
    key: "2",
    level: 2,
    title: "Verification statuses and corresponding events",
  },
  {
    key: "3",
    level: 3,
    title: "Handling retry status",
  },
  {
    key: "4",
    level: 3,
    title: "Handling status: suspended",
  },
  {
    key: "5",
    level: 4,
    title: "Determining verification documents needed",
  },
  {
    key: "6",
    level: 2,
    title: "Level 2 Heading",
  },
  {
    key: "7",
    level: 3,
    title: "Handling retry status",
  },
];

test("RightStickyNav", () => {
  const tree = renderer.create(<RightStickyNav headings={headings} />).toJSON();

  expect(tree).toMatchSnapshot();
});
