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
  { value: "raw", label: "Raw" },
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
