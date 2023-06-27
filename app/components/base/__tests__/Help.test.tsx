import renderer from "react-test-renderer";
import Help from "../Help";

const links = [
  { text: "Link one", href: "#" },
  { text: "Link two", href: "#" },
  { text: "Link three", href: "#" },
  { text: "Link four", href: "#" },
];

test("Help", () => {
  const tree = renderer.create(<Help links={links} />).toJSON();

  expect(tree).toMatchSnapshot();
});
