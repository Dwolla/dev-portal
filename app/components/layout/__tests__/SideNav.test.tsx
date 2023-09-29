import renderer from "react-test-renderer";
import SideNav, { SideNavLinkProps } from "../SideNav";
import Pages from "../../../modules/pages";

import { ReactComponent as HomeIcon } from "../../../../assets/images/component-icons/side-nav/home-nav-icon.svg";
import { ReactComponent as DwollaBalanceIcon } from "../../../../assets/images/component-icons/side-nav/dwolla-balance-nav-icon.svg";
import { ReactComponent as SdksToolsIcon } from "../../../../assets/images/component-icons/side-nav/sdks-tools-nav-icon.svg";
import { ReactComponent as ApiReferenceIcon } from "../../../../assets/images/component-icons/side-nav/api-reference-nav-icon.svg";

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
jest.mock("../../../modules/pages.import");

const SIDE_NAV_LINKS: SideNavLinkProps[] = [
  {
    href: "/docs",
    IconSvg: HomeIcon,
    isSection: false,
    text: "Home",
    isExternal: false,
  },
  {
    href: "/docs/balance",
    IconSvg: DwollaBalanceIcon,
    isSection: false,
    text: "Balance",
    isExternal: false,
    stickyReferenceLinks: [
      {
        href: "/api-reference",
        IconSvg: ApiReferenceIcon,
        isSection: false,
        text: "API Reference",
        isExternal: false,
      },
    ],
  },
  {
    href: "/api-reference",
    IconSvg: ApiReferenceIcon,
    isSection: true,
    text: "API Reference",
    isExternal: false,
  },
  {
    href: "/sdks-tools",
    IconSvg: SdksToolsIcon,
    isSection: false,
    text: "SDKs & Tools",
    isExternal: false,
  },
  {
    href: "https://discuss.dwolla.com/",
    text: "Community",
    isExternal: true,
  },
];

const TOP_BAR_PROPS = {
  button: {
    text: "Get API Keys",
    link: {
      href: "https://accounts-sandbox.dwolla.com/login",
      external: true,
    },
  },
};

const PRODUCT_OPTIONS = [
  { value: "connect", label: "Dwolla Connect" }, // Array[0] is selected by default
  { value: "balance", label: "Dwolla Balance" },
];

test("SideNav", () => {
  const tree = renderer
    .create(
      <SideNav
        pages={Pages.all()}
        sectionLinks={SIDE_NAV_LINKS}
        productSelectorOptions={PRODUCT_OPTIONS}
        mobileItems={TOP_BAR_PROPS}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
