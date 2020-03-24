import App, { createUrl } from "next/app";
import { MDXProvider } from "@mdx-js/react";
import Layout from "../components/layout/Layout";
import Pages from "../modules/pages";
import Anchors from "../components/util/Anchors";

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

const TOP_BAR_CHILDREN = [
  <select key="languages">
    <option>Node.js</option>
    <option>Python</option>
    <option>Ruby</option>
    <option>Kotlin</option>
    <option>Java</option>
  </select>,
];

const MDX_COMPONENTS = {
  wrapper: Anchors.Set,
};

export default class MyApp extends App {
  render() {
    const { router, Component, pageProps } = this.props;
    const url = createUrl(router);
    return (
      <Anchors.Provider>
        <MDXProvider components={MDX_COMPONENTS}>
          <Layout
            footerLinks={FOOTER_LINKS}
            pages={Pages.all()}
            sideNavLinks={SIDE_NAV_LINKS}
            topBarChildren={TOP_BAR_CHILDREN}
          >
            <Component {...pageProps} url={url} />
          </Layout>
        </MDXProvider>
      </Anchors.Provider>
    );
  }
}
