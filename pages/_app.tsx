import React, { useEffect, useState } from "react";
import { AppProps } from "next/app";
import useSWR from "swr";
import TagManager from "react-gtm-module";
import { CacheProvider, EmotionCache } from "@emotion/react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material";
import Layout from "../app/components/layout/Layout";
import Pages from "../app/modules/pages";
import { AnchorsProvider } from "../app/components/util/Anchors";
import { LanguageContext } from "../app/components/util/Contexts";
import { SideNavLinkProps } from "../app/components/layout/SideNav";
import fetcher from "../app/modules/fetcher";
import { ReactComponent as HomeIcon } from "../assets/images/component-icons/side-nav/home-nav-icon.svg";
import { ReactComponent as ApiReferenceIcon } from "../assets/images/component-icons/side-nav/api-reference-nav-icon.svg";
import { ReactComponent as GuidesIcon } from "../assets/images/component-icons/side-nav/guides-nav-icon.svg";
import { ReactComponent as ConceptsIcon } from "../assets/images/component-icons/side-nav/concepts-nav-icon.svg";
import { ReactComponent as SdksToolsIcon } from "../assets/images/component-icons/side-nav/sdks-tools-nav-icon.svg";
import { ReactComponent as CodeSamplesIcon } from "../assets/images/component-icons/side-nav/code-samples-nav-icon.svg";
import { ReactComponent as ChangelogIcon } from "../assets/images/component-icons/side-nav/changelog-nav-icon.svg";
import "react-tippy/dist/tippy.css";
import "react-tabs/style/react-tabs.css";
import useTrackPageViews from "../app/hooks/useTrackPageViews";
import createEmotionCache from "../app/modules/emotion-cache";
import theme from "../app/theme";

function GoogleTagManager() {
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
      />
    </noscript>
  );
}

const STATUS_PAGE_SUMMARY_URL =
  "https://tnynfs0nwlgr.statuspage.io/api/v2/summary.json";

const SIDE_NAV_LINKS: SideNavLinkProps[] = [
  {
    href: "/",
    IconSvg: HomeIcon,
    isSection: false,
    text: "Home",
    isExternal: false,
  },
  {
    href: "/api-reference",
    IconSvg: ApiReferenceIcon,
    isSection: true,
    text: "API Reference",
    isExternal: false,
  },
  {
    href: "/guides",
    IconSvg: GuidesIcon,
    isSection: true,
    text: "Guides",
    isExternal: false,
  },
  {
    href: "/concepts",
    IconSvg: ConceptsIcon,
    isSection: true,
    text: "Concepts",
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
    href: "/code-samples",
    IconSvg: CodeSamplesIcon,
    isSection: false,
    text: "Code Samples",
    isExternal: false,
  },
  {
    href: "/changelog",
    IconSvg: ChangelogIcon,
    isSection: false,
    text: "Changelog",
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
    { text: "SDKs & Tools", href: "/sdks-tools" },
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

const ANNOUNCEMENT_COPY =
  "Deprecation Announcement: At the end of 2022, Dwolla will sunset our Instant Account Verification (IAV) product, which is powered by Dwolla.js. As an alternative bank account verification option, we recommend utilizing one of our third-party data providers (e.g. Plaid) prior to December 31, 2022.";

const TOP_BAR_PROPS = {
  button: {
    text: "Get API Keys",
    link: {
      href: "https://accounts-sandbox.dwolla.com/login",
      external: true,
    },
  },
};

const LANGUAGE_OPTIONS = [
  { value: "javascript", label: "JavaScript" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "python", label: "Python" },
  { value: "bash", label: "Raw" },
];

const clientSideEmotionCache = createEmotionCache();

interface Props extends AppProps {
  emotionCache?: EmotionCache;
}

function AppWithHooks({ router, Component, pageProps }: Props) {
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGE_OPTIONS[0]);

  const apiStatus = useSWR(STATUS_PAGE_SUMMARY_URL, fetcher, {
    refreshInterval: 60000,
  }).data?.status;

  useTrackPageViews(router.pathname);

  return (
    <AnchorsProvider>
      <LanguageContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
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
          announcement={ANNOUNCEMENT_COPY}
        >
          <Component {...pageProps} url={router.pathname} />
        </Layout>
      </LanguageContext.Provider>
    </AnchorsProvider>
  );
}

export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
  router,
}: Props) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Dwolla Developers</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <GoogleTagManager />
        <AppWithHooks
          Component={Component}
          pageProps={pageProps}
          router={router}
        />
      </ThemeProvider>
    </CacheProvider>
  );
}
