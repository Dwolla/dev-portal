/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Head from "next/head";
import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import classnames from "classnames";
import React, { useEffect, useState } from "react";
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from "body-scroll-lock";
import { useRouter } from "next/router";
import SideNav, { SideNavLinkProps } from "./SideNav"; // eslint-disable-line no-unused-vars
import SecondaryNavBar from "./SecondaryNavBar";
import { GREY_2, PURPLE_023, WHITE_PRIMARY } from "../colors";
import { breakDown, breakUp } from "../breakpoints";
import { Z_TOB_BAR } from "../zIndexes";
import TopBar, { TOP_BAR_HEIGHT, TopBarProps } from "./TopBar"; // eslint-disable-line no-unused-vars
import Footer, { FooterLink } from "./Footer"; // eslint-disable-line no-unused-vars
import APIStatusBar from "./APIStatusBar";
import AlertBar from "../base/AlertBar";
import { SelectMuiOption } from "../base/SelectMui";

export const LEFT_SIDEBAR_WIDTH = "420";

const LayoutContainer = styled.div`
  @media (${breakUp("lg")}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

const LeftSidebar = styled.div`
  position: sticky;
  top: ${TOP_BAR_HEIGHT + 69}px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  height: calc(100vh - ${TOP_BAR_HEIGHT + 69}px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: opacity 300ms;
  opacity: 0;
  pointer-events: none;

  @media (${breakUp("lg")}) {
    width: ${LEFT_SIDEBAR_WIDTH}px;
    right: 75%;
    opacity: 1;
    pointer-events: auto;
  }

  @media (${breakDown("lg")}) {
    top: 0;
    height: calc(100vh - ${TOP_BAR_HEIGHT}px);
  }

  &.toggled {
    opacity: 1;
    pointer-events: auto;
  }

  /* Hides sidebar on smaller screens when not toggled. Not tabbable when not in view  */
  &.visuallyHidden {
    @media (${breakDown("md")}) {
      display: none;
    }
  }
`;

const SideNavWrapper = styled.div`
  flex-grow: 1;
  overflow: hidden;
  background: white;
  display: flex;
  flex-direction: column;
`;

const MainArea = styled.div`
  @media (${breakUp("lg")}) {
    width: calc(100vw - ${LEFT_SIDEBAR_WIDTH}px);
    border-left: 1px solid ${PURPLE_023};

    &.fullWidth {
      width: 100vw;
      padding: 32px 64px;
    }
  }

  border-top: 1px solid ${PURPLE_023};
`;

const ContentArea = styled.div`
  /* Hides ContentArea on smaller screens when SideBar is toggled. Not tabbable when not in view  */
  &.visuallyhidden {
    @media (${breakDown("md")}) {
      visibility: hidden;
    }
  }
`;

const TopBarWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: ${Z_TOB_BAR};
`;

const FooterWrapper = styled.div`
  border-top: 1px solid ${GREY_2};
  background: ${WHITE_PRIMARY};

  @media (${breakUp("xxl")}) {
    padding-right: 40px;
  }

  /* Hides FooterArea on smaller screens when SideBar is toggled. Not tabbable when not in view  */
  &.visuallyhidden {
    @media (${breakDown("md")}) {
      visibility: hidden;
    }
  }
`;

export default function Layout({
  children,
  pages,
  sideNavLinks,
  productSelectorOptions,
  selectedProduct,
  setSelectedProduct,
  navItems,
  footerLinks,
  footerLegal,
  topBarProps,
  apiStatus,
  announcement,
}: {
  children: JSX.Element;
  pages: Page[];
  sideNavLinks: SideNavLinkProps[];
  productSelectorOptions?: Array<SelectMuiOption>;
  selectedProduct: SelectMuiOption;
  setSelectedProduct: Function;
  navItems: SelectMuiOption[];
  footerLinks: Record<string, FooterLink[]>;
  footerLegal: {
    title: string;
    description: any;
  };
  topBarProps: TopBarProps;
  apiStatus: APIStatus;
  announcement?: JSX.Element;
}) {
  const router = useRouter();

  const [sidebarToggled, setSidebarToggled] = useState(false);
  const [selectedSecondaryNavItem, setSelectedSecondaryNavItem] = useState();

  // Check if the current route is exactly "/docs" (aka Homepage)
  const isHomepage = router.pathname === "/docs";

  useEffect(() => {
    if (document) {
      document.documentElement.lang = "en-us";
      enableBodyScroll(document.querySelector("#body-scroll-lock-side-nav"));

      if (sidebarToggled && !isHomepage) {
        disableBodyScroll(document.querySelector("#body-scroll-lock-side-nav"));
      }
    }

    return () => {
      clearAllBodyScrollLocks();
    };
  }, [sidebarToggled, isHomepage]);

  let updatedNavItems = [...navItems]; // Create a copy of NAV_ITEMS array

  // If selectedProduct is "connect", remove "dropIns" from updatedNavItems
  if (selectedProduct?.value === "connect") {
    updatedNavItems = navItems.filter((item) => item.value !== "dropIns");
  }

  return (
    <>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
          }

          .osano-cm-widget {
            display: none;
          }
        `}
      />

      <Head>
        <link rel="canonical" href={router?.pathname} />
      </Head>

      <TopBarWrapper>
        <TopBar
          {...topBarProps}
          sidebarToggled={sidebarToggled}
          setSidebarToggled={setSidebarToggled}
        />
        {/* Render SecondaryNavBar only if the current page is not "/docs" (aka Homepage)*/}
        {!isHomepage && (
          <SecondaryNavBar
            navItems={updatedNavItems}
            selectedSecondaryNavItem={selectedSecondaryNavItem}
            setSelectedSecondaryNavItem={setSelectedSecondaryNavItem}
            productOptions={productSelectorOptions}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
          />
        )}
      </TopBarWrapper>

      <LayoutContainer>
        {/* Render SideNav only if the current page is not "/docs" (aka Homepage)*/}
        {!isHomepage && (
          <LeftSidebar
            className={classnames(
              sidebarToggled ? "toggled" : "visuallyHidden"
            )}
          >
            <SideNavWrapper>
              <SideNav
                sectionLinks={sideNavLinks}
                pages={pages}
                mobileItems={topBarProps}
                secondaryNavItemOptions={navItems}
                selectedSecondaryNavItem={selectedSecondaryNavItem}
                setSelectedSecondaryNavItem={setSelectedSecondaryNavItem}
                productOptions={productSelectorOptions}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
              />
            </SideNavWrapper>

            <APIStatusBar apiStatus={apiStatus} />
          </LeftSidebar>
        )}

        <MainArea className={classnames({ fullWidth: isHomepage })}>
          {announcement && (
            <AlertBar variation="announcement" isClosable>
              {announcement}
            </AlertBar>
          )}

          <ContentArea
            className={classnames({
              visuallyhidden: sidebarToggled && !isHomepage,
            })}
          >
            {children}
          </ContentArea>

          <FooterWrapper
            className={classnames({ visuallyhidden: sidebarToggled })}
          >
            <Footer links={footerLinks} legal={footerLegal} />
          </FooterWrapper>
        </MainArea>
      </LayoutContainer>
    </>
  );
}
