import React, { useState } from "react";
import App, { createUrl } from "next/app";
import useSWR from "swr";
import Layout from "../components/layout/Layout";
import Pages from "../modules/pages";
import { AnchorsProvider } from "../components/util/Anchors";
import { LanguageContext } from "../components/util/Contexts";
import AuthPage from "../components/AuthPage";
import fetcher from "../modules/fetcher";
import { ReactComponent as HomeIcon } from "../assets/images/component-icons/side-nav/home-nav-icon.svg";
import { ReactComponent as GuidesIcon } from "../assets/images/component-icons/side-nav/guides-nav-icon.svg";
import { ReactComponent as ConceptsIcon } from "../assets/images/component-icons/side-nav/concepts-nav-icon.svg";
import { ReactComponent as SdksToolsIcon } from "../assets/images/component-icons/side-nav/sdks-tools-nav-icon.svg";

const STATUS_PAGE_SUMMARY_URL =
  "https://tnynfs0nwlgr.statuspage.io/api/v2/summary.json";

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
  description:
    "Dwolla, Inc. is an agent of Veridian Credit Union and all funds associated with your account in our network are held in one or more pooled accounts at Veridian Credit Union. These funds may not be eligible for share insurance by the National Credit Union Share Insurance Fund. Dwolla, Inc. is the operator of a software platform that communicates user instructions for funds transfers to Veridian Credit Union.",
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
          footerLegal={FOOTER_LEGAL_COPY}
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
