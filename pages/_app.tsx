import React, { useState } from "react";
import App, { createUrl } from "next/app";
import { MDXProvider } from "@mdx-js/react";
import useSWR from "swr";
import Layout from "../components/layout/Layout";
import Pages from "../modules/pages";
import { AnchorsSetter, AnchorsProvider } from "../components/util/Anchors";
import AuthPage from "../components/AuthPage";
import fetcher from "../modules/fetcher";
import { MDXTypographyWrapper } from "../components/base/Typography";

const STATUS_PAGE_SUMMARY_URL =
  "https://tnynfs0nwlgr.statuspage.io/api/v2/summary.json";

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

const MDX_COMPONENTS = {
  wrapper: ({ children }: { children: any }) => (
    <MDXTypographyWrapper>
      <AnchorsSetter>{children}</AnchorsSetter>
    </MDXTypographyWrapper>
  ),
};

const AppWithHooks = ({ router, Component, pageProps }: any) => {
  const [isAuthenticated, setAuthenticated] = useState(process.env.isDev);

  const url = createUrl(router);

  const apiStatus = useSWR(STATUS_PAGE_SUMMARY_URL, fetcher, {
    refreshInterval: 60000,
  }).data?.status;

  return isAuthenticated ? (
    <AnchorsProvider>
      <MDXProvider components={MDX_COMPONENTS}>
        <Layout
          footerLinks={FOOTER_LINKS}
          pages={Pages.all()}
          sideNavLinks={SIDE_NAV_LINKS}
          topBarProps={TOP_BAR_PROPS}
          apiStatus={apiStatus}
        >
          <Component {...pageProps} url={url} />
        </Layout>
      </MDXProvider>
    </AnchorsProvider>
  ) : (
    <AuthPage setAuthenticated={setAuthenticated} />
  );
};

export default class MyApp extends App {
  render() {
    const { router, Component, pageProps } = this.props;
    return (
      <AppWithHooks
        router={router}
        Component={Component}
        pageProps={pageProps}
      />
    );
  }
}
