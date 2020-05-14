import React, { useState } from "react";
import App, { createUrl } from "next/app";
import useSWR from "swr";
import Layout from "../components/layout/Layout";
import Pages from "../modules/pages";
import { AnchorsProvider } from "../components/util/Anchors";
import { LanguageContext } from "../components/util/Contexts";
import AuthPage from "../components/AuthPage";
import fetcher from "../modules/fetcher";
import homeIcon from "../assets/images/component-icons/side-nav/home-nav-icon.svg";
import guidesIcon from "../assets/images/component-icons/side-nav/guides-nav-icon.svg";
import conceptsIcon from "../assets/images/component-icons/side-nav/concepts-nav-icon.svg";
import sdksToolsIcon from "../assets/images/component-icons/side-nav/sdks-tools-nav-icon.svg";

const STATUS_PAGE_SUMMARY_URL =
  "https://tnynfs0nwlgr.statuspage.io/api/v2/summary.json";

const SIDE_NAV_LINKS = [
  {
    href: "/",
    iconSrc: homeIcon,
    isSection: false,
    text: "Home",
  },
  {
    href: "/docs/guides",
    iconSrc: guidesIcon,
    isSection: true,
    text: "Guides",
  },
  {
    href: "/docs/concepts",
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

const LANGUAGE_OPTIONS = [
  { value: "javascript", label: "JavaScript" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "python", label: "Python" },
  { value: "bash", label: "Raw" },
];

const AppWithHooks = ({ router, Component, pageProps }: any) => {
  const [isAuthenticated, setAuthenticated] = useState(process.env.isDev);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGE_OPTIONS[0]);

  const url = createUrl(router);

  const apiStatus = useSWR(STATUS_PAGE_SUMMARY_URL, fetcher, {
    refreshInterval: 60000,
  }).data?.status;

  return isAuthenticated ? (
    <AnchorsProvider>
      <LanguageContext.Provider
        value={{
          selectedLanguage,
          setSelectedLanguage,
          languageOptions: LANGUAGE_OPTIONS,
        }}
      >
        <Layout
          footerLinks={FOOTER_LINKS}
          pages={Pages.all()}
          sideNavLinks={SIDE_NAV_LINKS}
          topBarProps={TOP_BAR_PROPS}
          apiStatus={apiStatus}
        >
          <Component {...pageProps} url={url} />
        </Layout>
      </LanguageContext.Provider>
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
