import renderer from "react-test-renderer";
import SideNav from "../SideNav";
import Pages from "../../../modules/pages";

import homeIcon from "../../../assets/images/component-icons/side-nav/home-nav-icon.svg";
import guidesIcon from "../../../assets/images/component-icons/side-nav/guides-nav-icon.svg";
import conceptsIcon from "../../../assets/images/component-icons/side-nav/concepts-nav-icon.svg";
import sdksToolsIcon from "../../../assets/images/component-icons/side-nav/sdks-tools-nav-icon.svg";

const mockPath = "/";
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: mockPath,
      pathname: mockPath,
      query: "",
      asPath: mockPath,
    };
  },
}));
jest.mock("../../../modules/images.import");

const SIDE_NAV_LINKS = [
  {
    href: "/",
    iconSrc: homeIcon,
    isSection: false,
    text: "Home",
  },
  {
    href: "/guides",
    iconSrc: guidesIcon,
    isSection: true,
    text: "Guides",
  },
  {
    href: "/concepts",
    iconSrc: conceptsIcon,
    isSection: true,
    text: "Concepts",
  },
  {
    href: "/sdks-tools",
    iconSrc: sdksToolsIcon,
    isSection: false,
    text: "SDKs & Tools",
  },
];

test("SideNav", () => {
  const tree = renderer
    .create(<SideNav pages={Pages.all()} links={SIDE_NAV_LINKS} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
