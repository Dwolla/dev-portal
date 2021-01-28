import React, { useState, useEffect } from "react";
import App, { createUrl } from "next/app";
import useSWR from "swr";
import TagManager from "react-gtm-module";
import Layout from "../app/components/layout/Layout";
import Pages from "../app/modules/pages";
import { AnchorsProvider } from "../app/components/util/Anchors";
import { LanguageContext } from "../app/components/util/Contexts";
import fetcher from "../app/modules/fetcher";
import { ReactComponent as HomeIcon } from "../assets/images/component-icons/side-nav/home-nav-icon.svg";
import { ReactComponent as GuidesIcon } from "../assets/images/component-icons/side-nav/guides-nav-icon.svg";
import { ReactComponent as ConceptsIcon } from "../assets/images/component-icons/side-nav/concepts-nav-icon.svg";
import { ReactComponent as SdksToolsIcon } from "../assets/images/component-icons/side-nav/sdks-tools-nav-icon.svg";
import "react-tippy/dist/tippy.css";
import "react-tabs/style/react-tabs.css";
import useTrackPageViews from "../app/hooks/useTrackPageViews";

const GoogleTagManager = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      TagManager.initialize({ gtmId: "GTM-WRT5LD6" });
    }
  }, []);

  return (
    <noscript>
      <iframe
        title="google-tag-manager"
        src="https://www.googletagmanager.com/ns.html?id=GTM-WRT5LD6"
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      ></iframe>
    </noscript>
  );
};

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
    { text: "SDKs & Tools", href: "/sdks-tools" },
    { text: "Github Repos", href: "https://github.com/Dwolla/" },
  ],
};

const FOOTER_LEGAL_COPY = {
  title: "Financial institutions play an important role in our network.",
  operatorDescription:
    "Dwolla, Inc. is the operator of a software platform that communicates user instructions for funds transfers to our financial institution partners.",
  veridianDescription:
    "Dwolla is an agent of Veridian Credit Union. All ACH and Wire transfers are performed by Veridian Credit Union. Your Dwolla Balance, if any, is held in one or more pooled holding accounts held by Veridian Credit Union. These funds may not be eligible for share insurance by the National Credit Union Share Insurance Fund.",
  metaBankDescription: (
    <span>
      Sponsorship and Settlement of Push-to-Debit payment services provided by{" "}
      <span style={{ whiteSpace: "nowrap" }}>MetaBank®, N.A.</span>
      <br /> Push-to-Debit payments are typically available within 30 minutes.
    </span>
  ),
  rtpDescription:
    "Real-Time Payments are performed by Cross River Bank, which holds funds on behalf of the Receiver of such transactions in one or more pooled custodial accounts. These funds are not subject to FDIC pass-through deposit insurance.",
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

const LANGUAGE_OPTIONS = [
  { value: "javascript", label: "JavaScript" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "python", label: "Python" },
  { value: "bash", label: "Raw" },
];

const AppWithHooks = ({ router, Component, pageProps }: any) => {
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGE_OPTIONS[0]);

  const url = createUrl(router);

  const apiStatus = useSWR(STATUS_PAGE_SUMMARY_URL, fetcher, {
    refreshInterval: 60000,
  }).data?.status;

  useTrackPageViews(url.pathname);

  return (
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
  );
};

export default class MyApp extends App {
  render() {
    const { router, Component, pageProps } = this.props;
    return (
      <>
        <GoogleTagManager />
        <AppWithHooks
          router={router}
          Component={Component}
          pageProps={pageProps}
        />
      </>
    );
  }
}
