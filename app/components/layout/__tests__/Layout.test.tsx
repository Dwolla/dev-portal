import renderer from "react-test-renderer";
import Layout from "../Layout";
import Pages from "../../../modules/pages";

import { ReactComponent as HomeIcon } from "../../../../assets/images/component-icons/side-nav/home-nav-icon.svg";
import { ReactComponent as GuidesIcon } from "../../../../assets/images/component-icons/side-nav/guides-nav-icon.svg";
import { ReactComponent as ConceptsIcon } from "../../../../assets/images/component-icons/side-nav/concepts-nav-icon.svg";
import { ReactComponent as SdksToolsIcon } from "../../../../assets/images/component-icons/side-nav/sdks-tools-nav-icon.svg";

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
    IconSvg: HomeIcon,
    isSection: false,
    text: "Home",
  },
  {
    href: "/guides",
    IconSvg: GuidesIcon,
    isSection: true,
    text: "Guides",
  },
  {
    href: "/concepts",
    IconSvg: ConceptsIcon,
    isSection: true,
    text: "Concepts",
  },
  {
    href: "/sdks-tools",
    IconSvg: SdksToolsIcon,
    isSection: false,
    text: "SDKs & Tools",
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
    { text: "Resources", href: "https://www.dwolla.com/resources/" },
    { text: "Features", href: "https://www.dwolla.com/features/" },
    { text: "Case Studies", href: "https://www.dwolla.com/case-studies/" },
    { text: "Integrations", href: "https://www.dwolla.com/integrations/" },
  ],
  Developers: [
    { text: "API Reference", href: "https://docs.dwolla.com/" },
    { text: "Support Forum", href: "https://discuss.dwolla.com/" },
    { text: "SDKs and Tools", href: "#sdks-and-tools" },
    { text: "Github Repos", href: "https://github.com/Dwolla/" },
  ],
};

const FOOTER_LEGAL_COPY = {
  title: "Financial institutions play an important role in our network.",
  veridianDescription:
    "Dwolla, Inc. is an agent of Veridian Credit Union and all funds associated with your account in our network are held in one or more pooled accounts at Veridian Credit Union. These funds may not be eligible for share insurance by the National Credit Union Share Insurance Fund. Dwolla, Inc. is the operator of a software platform that communicates user instructions for funds transfers to Veridian Credit Union.",
  metaBankDescription: (
    <span>
      Sponsorship and Settlement of Push-to-Debit payment services provided by{" "}
      <span style={{ whiteSpace: "nowrap" }}>MetaBank®, N.A.</span>
      <br /> Push-to-Debit payments are typically available within 30 minutes.
    </span>
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
  links: [
    { text: "API Docs", href: "https://docs.dwolla.com", external: true },
    { text: "Changelog", href: "/changelog" },
  ],
};

test("Layout", () => {
  const tree = renderer
    .create(
      <Layout
        sideNavLinks={SIDE_NAV_LINKS}
        footerLinks={FOOTER_LINKS}
        footerLegal={FOOTER_LEGAL_COPY}
        topBarProps={TOP_BAR_PROPS}
        pages={Pages.all()}
        apiStatus={{ indicator: "none", description: "apiStatus description" }}
      >
        <div>page</div>
      </Layout>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
