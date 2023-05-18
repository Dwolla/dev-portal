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
import { GREY_2, LAYOUT_BORDER, WHITE_PRIMARY } from "../colors";
import { breakDown, breakUp } from "../breakpoints";
import { Z_TOB_BAR } from "../zIndexes";
import TopBar, { TOP_BAR_HEIGHT, TopBarProps } from "./TopBar"; // eslint-disable-line no-unused-vars
import Footer, { FooterLink } from "./Footer"; // eslint-disable-line no-unused-vars
import APIStatusBar from "./APIStatusBar";
import AlertBar from "../base/AlertBar";

const LEFT_SIDEBAR_WIDTH = "320";

const LayoutContainer = styled.div`
  @media (${breakUp("lg")}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

const LeftSidebar = styled.div`
  position: sticky;
  top: ${TOP_BAR_HEIGHT}px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  height: calc(100vh - ${TOP_BAR_HEIGHT}px);
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
    border-left: 1px solid ${LAYOUT_BORDER};
  }
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
  footerLinks,
  footerLegal,
  topBarProps,
  apiStatus,
  announcement,
}: {
  children: JSX.Element;
  pages: Page[];
  sideNavLinks: SideNavLinkProps[];
  footerLinks: Record<string, FooterLink[]>;
  footerLegal: {
    title: string;
    description: any;
  };
  topBarProps: TopBarProps;
  apiStatus: APIStatus;
  announcement?: JSX.Element;
}) {
  const [sidebarToggled, setSidebarToggled] = useState(false);

  useEffect(() => {
    if (document) {
      document.documentElement.lang = "en-us";
      enableBodyScroll(document.querySelector("#body-scroll-lock-side-nav"));
      if (sidebarToggled) {
        disableBodyScroll(document.querySelector("#body-scroll-lock-side-nav"));
      }
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [sidebarToggled]);

  const router = useRouter();

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
      </TopBarWrapper>

      <LayoutContainer>
        <LeftSidebar
          className={classnames(sidebarToggled ? "toggled" : "visuallyHidden")}
        >
          <SideNavWrapper>
            <SideNav
              sectionLinks={sideNavLinks}
              pages={pages}
              mobileItems={topBarProps}
            />
          </SideNavWrapper>

          <APIStatusBar apiStatus={apiStatus} />
        </LeftSidebar>

        <MainArea>
          {announcement && (
            <AlertBar variation="announcement" isClosable>
              {announcement}
            </AlertBar>
          )}

          <ContentArea
            className={classnames({ visuallyhidden: sidebarToggled })}
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
