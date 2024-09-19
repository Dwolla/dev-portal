import React from "react";
import renderer from "react-test-renderer";
import Layout from "../Layout";
import Pages from "../../../modules/pages";

import { ReactComponent as HomeIcon } from "../../../../assets/images/component-icons/side-nav/home-nav-icon.svg";
import { ReactComponent as DwollaBalanceIcon } from "../../../../assets/images/component-icons/side-nav/dwolla-balance-nav-icon.svg";
import { ReactComponent as SdksToolsIcon } from "../../../../assets/images/component-icons/side-nav/sdks-tools-nav-icon.svg";
import { ReactComponent as ApiReferenceIcon } from "../../../../assets/images/component-icons/side-nav/api-reference-nav-icon.svg";
import { ReactComponent as DwollaConnectColorIcon } from "../../../../assets/images/product-icons-and-heroes/dwolla-connect-icon-48x48.svg";
import { ReactComponent as DwollaBalanceColorIcon } from "../../../../assets/images/product-icons-and-heroes/dwolla-balance-icon-48x48.svg";
import { SideNavLinkProps } from "../SideNav";
import { SelectMuiOption } from "../../base/SelectMui";

jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({
    route: "/",
    pathname: "/",
    query: "",
    asPath: "/",
    push: jest.fn(),
  })),
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

const FOOTER_LINKS = {
  Dwolla: [
    { text: "About", href: "https://www.dwolla.com/about/" },
    { text: "Blog", href: "https://www.dwolla.com/updates/" },
    { text: "Pricing", href: "https://www.dwolla.com/pricing/" },
    { text: "Contact Sales", href: "https://www.dwolla.com/contact/" },
    { text: "Terms of Service", href: "https://www.dwolla.com/legal/tos/" },
    { text: "Privacy Policy", href: "https://www.dwolla.com/legal/privacy/" },
  ],
  Product: [
    { text: "Support", href: "https://support.dwolla.com/s/" },
    { text: "Resources", href: "https://www.dwolla.com/resources/" },
    { text: "Features", href: "https://www.dwolla.com/features/" },
    { text: "Case Studies", href: "https://www.dwolla.com/case-studies/" },
  ],
  Developers: [
    {
      text: "API Reference",
      href: "https://developers.dwolla.com/api-reference/",
    },
    { text: "Support Forum", href: "https://discuss.dwolla.com/" },
    { text: "SDKs and Tools", href: "#sdks-and-tools" },
    { text: "Github Repos", href: "https://github.com/Dwolla/" },
  ],
};

const FOOTER_LEGAL_COPY = {
  title: "Financial institutions play an important role in our network.",
  description: (
    <>
      All funds transfers made using the Dwolla Platform are performed by a
      financial institution partner, and any funds held in a Dwolla Balance are
      held by a financial institution partner.{" "}
      <a
        href="https://www.dwolla.com/legal/about-our-financial-institution-partners/#legal-content"
        target="_blank"
        rel="noreferrer"
      >
        Learn more about our financial institution partners
      </a>
      .
    </>
  ),
};

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
    value: "guidesAndConcepts",
    label: "Guides And Concepts",
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

const mockSelectedProduct = PRODUCT_OPTIONS[0];
const mockSetSelectedProduct = jest.fn();

test("Layout", () => {
  const tree = renderer
    .create(
      <Layout
        sideNavLinks={SIDE_NAV_LINKS}
        footerLinks={FOOTER_LINKS}
        footerLegal={FOOTER_LEGAL_COPY}
        topBarProps={TOP_BAR_PROPS}
        productSelectorOptions={PRODUCT_OPTIONS}
        selectedProduct={mockSelectedProduct}
        setSelectedProduct={mockSetSelectedProduct}
        navItems={NAV_ITEMS}
        pages={Pages.all()}
        apiStatus={{ indicator: "none", description: "apiStatus description" }}
      >
        <div>page</div>
      </Layout>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
