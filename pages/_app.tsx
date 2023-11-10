import React, { useEffect, useState } from "react";
import { AppProps } from "next/app";
import useSWR from "swr";
import TagManager from "react-gtm-module";
import { CacheProvider, EmotionCache } from "@emotion/react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material";
import Script from "next/script";
import algoliasearch from "algoliasearch/lite";
import Layout from "../app/components/layout/Layout";
import Pages from "../app/modules/pages";
import { AnchorsProvider } from "../app/components/util/Anchors";
import {
  LanguageContext,
  ProductContext,
} from "../app/components/util/Contexts";
import { SideNavLinkProps } from "../app/components/layout/SideNav";
import { NavItemProps } from "../app/components/layout/SecondaryNavBar";
import { TopBarProps } from "../app/components/layout/TopBar";
import fetcher from "../app/modules/fetcher";
import { ReactComponent as HomeIcon } from "../assets/images/component-icons/side-nav/home-nav-icon.svg";
import { ReactComponent as ApiReferenceIcon } from "../assets/images/component-icons/side-nav/api-reference-nav-icon.svg";
import { ReactComponent as DwollaBalanceIcon } from "../assets/images/component-icons/side-nav/dwolla-balance-nav-icon.svg";
import { ReactComponent as DwollaConnectIcon } from "../assets/images/component-icons/side-nav/dwolla-connect-nav-icon.svg";
import { ReactComponent as SdksToolsIcon } from "../assets/images/component-icons/side-nav/sdks-tools-nav-icon.svg";
import { ReactComponent as CodeSamplesIcon } from "../assets/images/component-icons/side-nav/code-samples-nav-icon.svg";
import { ReactComponent as ChangelogIcon } from "../assets/images/component-icons/side-nav/changelog-nav-icon.svg";
import { ReactComponent as DwollaConnectColorIcon } from "../assets/images/product-icons-and-heroes/dwolla-connect-icon-48x48.svg";
import { ReactComponent as DwollaBalanceColorIcon } from "../assets/images/product-icons-and-heroes/dwolla-balance-icon-48x48.svg";
import "react-tippy/dist/tippy.css";
import "react-tabs/style/react-tabs.css";
import useTrackPageViews from "../app/hooks/useTrackPageViews";
import createEmotionCache from "../app/modules/emotion-cache";
import theme from "../app/theme";
import { FooterLink } from "../app/components/layout/Footer";

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
        style={{
          display: "none",
          visibility: "hidden",
        }}
      />
    </noscript>
  );
}

const FOOTER_LINKS: Record<string, FooterLink[]> = {
  Dwolla: [
    {
      text: "About",
      href: "https://www.dwolla.com/about/",
    },
    {
      text: "Blog",
      href: "https://www.dwolla.com/updates/",
    },
    {
      text: "Pricing",
      href: "https://www.dwolla.com/pricing/",
    },
    {
      text: "Contact Sales",
      href: "https://www.dwolla.com/contact/",
    },
    {
      text: "Terms of Service",
      href: "https://www.dwolla.com/legal/tos/",
    },
    {
      text: "Privacy Policy",
      href: "https://www.dwolla.com/legal/privacy/",
    },
    {
      text: "Privacy Options",
      onClick: () =>
        window.Osano.cm.showDrawer("osano-cm-dom-info-dialog-open"),
    },
  ],
  Product: [
    {
      text: "Support",
      href: "https://support.dwolla.com/s/",
    },
    {
      text: "Resources",
      href: "https://www.dwolla.com/resources/",
    },
    {
      text: "Features",
      href: "https://www.dwolla.com/features/",
    },
    {
      text: "Case Studies",
      href: "https://www.dwolla.com/case-studies/",
    },
  ],
  Developers: [
    {
      text: "API Reference",
      href: "https://developers.dwolla.com/api-reference/",
    },
    {
      text: "Support Forum",
      href: "https://discuss.dwolla.com/",
    },
    {
      text: "SDKs & Tools",
      href: "/sdks-tools",
    },
    {
      text: "Github Repos",
      href: "https://github.com/Dwolla/",
    },
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

const LANGUAGE_OPTIONS = [
  {
    value: "bash",
    label: "Raw",
  },
  {
    value: "javascript",
    label: "Node.js",
  },
  {
    value: "php",
    label: "PHP",
  },
  {
    value: "ruby",
    label: "Ruby",
  },
  {
    value: "python",
    label: "Python",
  },
];

const NAV_ITEMS: NavItemProps[] = [
  {
    value: "platformOverview",
    label: "Platform Overview",
    href: "https://developers.dwolla.com/docs/balance",
  },
  {
    value: "apiReference",
    label: "API Reference",
    href: "https://developers.dwolla.com/api-reference",
  },
  {
    value: "codeSamples",
    label: "Code Samples",
    href: "https://developers.dwolla.com/code-samples",
  },
  {
    value: "dropIns",
    label: "Drop Ins",
    href: "https://developers.dwolla.com/docs/balance/drop-in-components",
  },
  {
    value: "sdks",
    label: "SDKs",
    href: "https://developers.dwolla.com/sdks-tools",
  },
  {
    value: "changelog",
    label: "Changelog",
    href: "https://developers.dwolla.com/changelog",
  },
];

const PRODUCT_OPTIONS = [
  { value: "connect", label: "Dwolla Connect", icon: DwollaConnectColorIcon }, // Array[0] is selected by default
  { value: "balance", label: "Dwolla Balance", icon: DwollaBalanceColorIcon },
];

const STATUS_PAGE_SUMMARY_URL =
  "https://tnynfs0nwlgr.statuspage.io/api/v2/summary.json";

const SIDE_NAV_LINKS: SideNavLinkProps[] = [
  {
    href: "/docs",
    IconSvg: HomeIcon,
    isSection: false,
    text: "Home",
    isExternal: false,
  },
  {
    href: "/docs/connect",
    IconSvg: DwollaConnectIcon,
    isSection: true,
    text: "Dwolla Connect",
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
    href: "/docs/balance",
    IconSvg: DwollaBalanceIcon,
    isSection: true,
    text: "Dwolla Balance",
    isExternal: false,
    stickyReferenceLinks: [
      {
        href: "/api-reference",
        IconSvg: ApiReferenceIcon,
        isSection: false,
        text: "API Reference",
        isExternal: false,
      },
      {
        href: "/code-samples",
        IconSvg: CodeSamplesIcon,
        isSection: false,
        text: "Code Samples",
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
    productSelector: true,
  },
  {
    href: "/sdks-tools",
    IconSvg: SdksToolsIcon,
    isSection: true,
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
];

const TOP_BAR_PROPS: TopBarProps = {
  helpLinks: [
    {
      href: "https://discuss.dwolla.com/",
      text: "Developer Forum",
    },
    {
      href: "https://support.dwolla.com/s/",
      text: "Support Center",
    },
    {
      href: "https://accounts.dwolla.com/login",
      text: "Dashboard",
    },
    {
      href: "https://discuss.dwolla.com/c/api-support/other/31",
      text: "Submit Feedback",
    },
  ],
  algoliaSearch: {
    branch: "main",
    searchClient: algoliasearch(
      "L2PPGO4SBB",
      "6a6c05b578da5aa729df7f53776e9f76"
    ),
    siteId: "e19df9e6-7024-443d-8ec0-26e8312ce0f9",
    searchOptions: { hitsPerPage: 5 },
  },
  button: {
    text: "Get API Keys",
    link: {
      href: "https://accounts-sandbox.dwolla.com/login",
      external: true,
    },
  },
};

const clientSideEmotionCache = createEmotionCache();

interface Props extends AppProps {
  emotionCache?: EmotionCache;
}

function AppWithHooks({ router, Component, pageProps }: Props) {
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGE_OPTIONS[0]);
  const [selectedProduct, setSelectedProduct] = useState(PRODUCT_OPTIONS[0]);

  const apiStatus = useSWR(STATUS_PAGE_SUMMARY_URL, fetcher, {
    refreshInterval: 60000,
  }).data?.status;

  useTrackPageViews(router.pathname);

  return (
    <AnchorsProvider>
      <LanguageContext.Provider
        value={{
          selectedLanguage,
          setSelectedLanguage,
          languageOptions: LANGUAGE_OPTIONS,
        }}
      >
        <ProductContext.Provider
          value={{
            selectedProduct,
            setSelectedProduct,
            productOptions: PRODUCT_OPTIONS,
          }}
        >
          <Layout
            apiStatus={apiStatus}
            footerLinks={FOOTER_LINKS}
            footerLegal={FOOTER_LEGAL_COPY}
            navItems={NAV_ITEMS}
            pages={Pages.all()}
            productSelectorOptions={PRODUCT_OPTIONS}
            topBarProps={TOP_BAR_PROPS}
            sideNavLinks={SIDE_NAV_LINKS}
          >
            <Component {...pageProps} url={router.pathname} />
          </Layout>
        </ProductContext.Provider>
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
      <Script
        strategy="beforeInteractive"
        src="https://cmp.osano.com/AzqJMPTLxS9IY2EXW/246df7a7-bd5d-4e24-bc61-0e96824367c8/osano.js"
      />
    </CacheProvider>
  );
}
