import renderer from "react-test-renderer";
import SideNav, { SideNavLinkProps } from "../SideNav";
import { SelectMuiOption } from "../../base/SelectMui";
import Pages from "../../../modules/pages";

import { ReactComponent as HomeIcon } from "../../../../assets/images/component-icons/side-nav/home-nav-icon.svg";
import { ReactComponent as DwollaBalanceIcon } from "../../../../assets/images/component-icons/side-nav/dwolla-balance-nav-icon.svg";
import { ReactComponent as SdksToolsIcon } from "../../../../assets/images/component-icons/side-nav/sdks-tools-nav-icon.svg";
import { ReactComponent as ApiReferenceIcon } from "../../../../assets/images/component-icons/side-nav/api-reference-nav-icon.svg";
import { ReactComponent as DwollaConnectColorIcon } from "../../../../assets/images/product-icons-and-heroes/dwolla-connect-icon-48x48.svg";
import { ReactComponent as DwollaBalanceColorIcon } from "../../../../assets/images/product-icons-and-heroes/dwolla-balance-icon-48x48.svg";

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

const PRODUCT_OPTIONS: SelectMuiOption[] = [
  { value: "connect", label: "Dwolla Connect", icon: DwollaConnectColorIcon },
  { value: "balance", label: "Dwolla Balance", icon: DwollaBalanceColorIcon },
];

const NAV_ITEMS: SelectMuiOption[] = [
  {
    value: "platformOverview",
    label: "Platform Overview",
    href: (selectedProduct) => `/docs/${selectedProduct}`, // Dynamic href, changes based on selectedProduct Context
  },
  {
    value: "apiReference",
    label: "API Reference",
    href: (selectedProduct) => `/docs/${selectedProduct}/api-reference`, // Dynamic href, changes based on selectedProduct Context
  },
  {
    value: "codeSamples",
    label: "Code Samples",
    href: () => "/code-samples", // Static href, unchanged
  },
  {
    value: "dropIns",
    label: "Drop Ins",
    href: () => "/docs/drop-in-components", // Static href, unchanged
  },
  {
    value: "sdks",
    label: "SDKs",
    href: () => "/sdks-tools", // Static href, unchanged
  },
  {
    value: "changelog",
    label: "Changelog",
    href: () => "/changelog", // Static href, unchanged
  },
];
test("SideNav", () => {
  const setState = jest.fn();
  const tree = renderer
    .create(
      <SideNav
        pages={Pages.all()}
        sectionLinks={SIDE_NAV_LINKS}
        secondaryNavItemOptions={NAV_ITEMS}
        selectedSecondaryNavItem={NAV_ITEMS[0]}
        setSelectedSecondaryNavItem={setState}
        productOptions={PRODUCT_OPTIONS}
        selectedProduct={PRODUCT_OPTIONS[0]}
        setSelectedProduct={setState}
        mobileItems={TOP_BAR_PROPS}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
