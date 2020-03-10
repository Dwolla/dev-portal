import renderer from "react-test-renderer";
import SideNav from "../SideNav";
import Pages from "../../../modules/pages";

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

const SIDE_NAV_LINKS = [
  {
    href: "/",
    iconSrc: "/images/home-icon.svg",
    isSection: false,
    text: "Home",
  },
  {
    href: "/docs/guides",
    iconSrc: "/images/guides-icon.svg",
    isSection: true,
    text: "Guides",
  },
  {
    href: "/docs/concepts",
    iconSrc: "/images/concepts-icon.svg",
    isSection: true,
    text: "Concepts",
  },
  {
    href: "/sdks-tools",
    iconSrc: "/images/sdks-tools-icon.svg",
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
