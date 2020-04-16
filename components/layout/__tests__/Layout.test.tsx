import renderer from "react-test-renderer";
import Layout from "../Layout";
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

const FOOTER_LINKS = {
  Discover: [
    { text: "Send", href: "#discover-send" },
    { text: "Receive", href: "#discover-receive" },
    { text: "Send & Receive", href: "#discover-send-receive" },
    { text: "Facilitate", href: "#facilitate" },
    { text: "Me to Me", href: "#me-to-me" },
  ],
  Concepts: [
    { text: "Basics", href: "#concepts-basics" },
    { text: "Essentials", href: "#concepts-essentials" },
    { text: "Integrations", href: "#concepts-integrations" },
  ],
  Guides: [
    { text: "Prerequisites", href: "#guides-prerequisites" },
    { text: "Get Building", href: "#guides-get-building" },
    { text: "Features", href: "#features" },
  ],
  "API Reference": [
    { text: "Documentation", href: "#api-reference-documentation" },
    { text: "SDK Support", href: "api-reference-sdk-support" },
    { text: "What does the Dwolla API do?", href: "#api-reference-what-it-do" },
  ],
  "Tools and SDKs": [
    { text: "Ruby", href: "#tools-and-sdks-ruby" },
    { text: "Python", href: "#tools-and-sdks-python" },
    { text: "PHP", href: "#tools-and-sdks-php" },
    { text: "C#", href: "#tools-and-sdks-csharp" },
    { text: "Java", href: "#tools-and-sdks-java" },
    { text: "JavaScript", href: "#tools-and-sdks-javascript" },
  ],
};

const TOP_BAR_PROPS = {
  button: { text: "Get API Keys" },
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
