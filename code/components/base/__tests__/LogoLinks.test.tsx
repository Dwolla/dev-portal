import renderer from "react-test-renderer";
import LogoLinks from "../LogoLinks";
import phpColor from "../../../../assets/images/content-images/content-icons/language-logos/php-logo.svg";
import phpGray from "../../../../assets/images/content-images/content-icons/language-logos/php-logo-gray.svg";
import pythonColor from "../../../../assets/images/content-images/content-icons/language-logos/python-logo.svg";
import pythonGray from "../../../../assets/images/content-images/content-icons/language-logos/python-logo-gray.svg";
import rubyColor from "../../../../assets/images/content-images/content-icons/language-logos/ruby-logo.svg";
import rubyGray from "../../../../assets/images/content-images/content-icons/language-logos/ruby-logo-gray.svg";
import cSharpColor from "../../../../assets/images/content-images/content-icons/language-logos/c-sharp-logo.svg";
import cSharpGray from "../../../../assets/images/content-images/content-icons/language-logos/c-sharp-logo-gray.svg";
import kotlinColor from "../../../../assets/images/content-images/content-icons/language-logos/kotlin-logo.svg";
import kotlinGray from "../../../../assets/images/content-images/content-icons/language-logos/kotlin-logo-gray.svg";
import nodeColor from "../../../../assets/images/content-images/content-icons/language-logos/node-js-logo.svg";
import nodeGray from "../../../../assets/images/content-images/content-icons/language-logos/node-js-logo-gray.svg";

const content = [
  {
    label: "node",
    icon: nodeGray,
    iconActive: nodeColor,
    href: "https://github.com/Dwolla/dwolla-v2-node",
  },
  {
    label: "ruby",
    icon: rubyGray,
    iconActive: rubyColor,
    href: "https://github.com/Dwolla/dwolla-v2-ruby",
  },
  {
    label: "python",
    icon: pythonGray,
    iconActive: pythonColor,
    href: "https://github.com/Dwolla/dwolla-v2-python",
  },
  {
    label: "php",
    icon: phpGray,
    iconActive: phpColor,
    href: "https://github.com/Dwolla/dwolla-swagger-php",
  },
  {
    label: "c-sharp",
    icon: cSharpGray,
    iconActive: cSharpColor,
    href: "https://github.com/Dwolla/dwolla-v2-csharp",
  },
  {
    label: "kotlin",
    icon: kotlinGray,
    iconActive: kotlinColor,
    href: "https://github.com/Dwolla/dwolla-v2-kotlin",
  },
];

test("LogoLinks", () => {
  const tree = renderer.create(<LogoLinks tabs={content} />).toJSON();

  expect(tree).toMatchSnapshot();
});
