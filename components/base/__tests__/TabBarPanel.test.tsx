import renderer from "react-test-renderer";
import TabBarPanel from "../TabBarPanel";
import phpGray from "../../assets/images/content-icons/php-gray.svg";
import pythonGray from "../../assets/images/content-icons/python-gray.svg";
import rubyColor from "../../assets/images/content-icons/ruby-color.svg";
import rubyGray from "../../assets/images/content-icons/ruby-gray.svg";
import cSharpGray from "../../assets/images/content-icons/c-sharp-gray.svg";
import kotlinGray from "../../assets/images/content-icons/kotlin-gray.svg";
import nodeGray from "../../assets/images/content-icons/node-gray.svg";

const content = [
  {
    label: "node",
    icon: nodeGray,
    iconActive: nodeGray,
    content: "Here's some content related to Node.",
  },
  {
    label: "ruby",
    icon: rubyGray,
    iconActive: rubyColor,
    content: "Here's some content related to Ruby.",
  },
  {
    label: "python",
    icon: pythonGray,
    iconActive: pythonGray,
    content: "Here's some content related to Python.",
  },
  {
    label: "php",
    icon: phpGray,
    iconActive: phpGray,
    content: "Here's some content related to PHP.",
  },
  {
    label: "c-sharp",
    icon: cSharpGray,
    iconActive: cSharpGray,
    content: "Here's some content related to C Sharp.",
  },
  {
    label: "kotlin",
    icon: kotlinGray,
    iconActive: kotlinGray,
    content: "Here's some content related to Kotlin.",
  },
];

test("TabBarPanel", () => {
  const tree = renderer.create(<TabBarPanel tabs={content} />).toJSON();

  expect(tree).toMatchSnapshot();
});
