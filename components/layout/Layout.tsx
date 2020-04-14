/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Head from "next/head";
import { css, Global } from "@emotion/core";
import styled from "@emotion/styled";
import classnames from "classnames";
import { useState } from "react";
import SideNav, { SideNavLinkProps } from "./SideNav"; // eslint-disable-line no-unused-vars
import { GREY_2, WHITE_PRIMARY } from "../colors";
import {
  maxWidth,
  minWidth,
  BREAKPOINT_DESKTOP,
  BREAKPOINT_IPAD,
} from "../breakpoints";
import TopBar, { TOP_BAR_HEIGHT, TopBarProps } from "./TopBar"; // eslint-disable-line no-unused-vars
import Footer, { FooterLink } from "./Footer"; // eslint-disable-line no-unused-vars
import OnThisPage from "./OnThisPage";
import APIStatusBar from "./APIStatusBar";

export const LEFT_SIDEBAR_PADDING_X = "20px";

const LeftSidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid ${GREY_2};
  transform: translate3d(0, -100vh, 0);
  z-index: 9999;

  @media (${minWidth(BREAKPOINT_DESKTOP)}) {
    right: 75%;
    transform: translate3d(0, 0, 0);
  }

  &.toggled {
    transform: translate3d(0, 0, 0);
  }
`;

const LogoWrapper = styled.div`
  padding: 12px ${LEFT_SIDEBAR_PADDING_X};
  background: white;
  flex-shrink: 1;
`;

const SideNavWrapper = styled.div`
  flex-grow: 1;
  overflow: hidden;
  background: white;
  padding-bottom: 60px;
`;

const MainArea = styled.div`
  @media (${minWidth(BREAKPOINT_DESKTOP)}) {
    margin-left: 25%;
  }
`;

const ContentArea = styled.div`
  display: flex;

  @media (${minWidth(BREAKPOINT_DESKTOP)}) {
    margin-right: 40px;
  }
`;

const TopBarWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 99;
`;

const OnThisPageWrapper = styled.div`
  position: sticky;
  top: ${TOP_BAR_HEIGHT}px;
  max-height: calc(100vh - ${TOP_BAR_HEIGHT}px);
  width: 30%;
  flex-shrink: 0;
  overflow-y: scroll;

  :empty {
    display: none;
  }

  @media (${maxWidth(BREAKPOINT_IPAD)}) {
    display: none;
  }
`;

const ContentWrapper = styled.div`
  overflow: hidden;
  min-width: 70%;
  flex-grow: 1;
`;

const FooterWrapper = styled.div`
  background: ${WHITE_PRIMARY};
  z-index: 9;
`;

export default function Layout({
  children,
  pages,
  sideNavLinks,
  footerLinks,
  topBarProps,
  apiStatus,
}: {
  children: JSX.Element;
  pages: Page[];
  sideNavLinks: SideNavLinkProps[];
  footerLinks: Record<string, FooterLink[]>;
  topBarProps: TopBarProps;
  apiStatus: APIStatus;
}) {
  const [sidebarToggled, setSidebarToggled] = useState(false);

  const showSidebar = () => setSidebarToggled(true);
  const hideSidebar = () => setSidebarToggled(false);

  return (
    <>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
          }
        `}
      />

      <Head>
        <title>Dwolla Developers</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/modern-normalize/0.5.0/modern-normalize.min.css"
        ></link>
        <link
          href="https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i|Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <LeftSidebar className={classnames({ toggled: sidebarToggled })}>
        <LogoWrapper>
          <img
            src="/images/close-icon-orange.svg"
            alt=""
            onClick={hideSidebar}
            css={css`
              float: right;
              transform: translate3d(0, 15px, 0);

              @media (${minWidth(BREAKPOINT_DESKTOP)}) {
                display: none;
              }
            `}
          />

          <img
            src="/images/dwolla-developers-logo.png"
            alt="Dwolla Developers Logo"
          />
        </LogoWrapper>

        <SideNavWrapper>
          <SideNav links={sideNavLinks} pages={pages} />
        </SideNavWrapper>

        <APIStatusBar apiStatus={apiStatus} />
      </LeftSidebar>

      <MainArea>
        <TopBarWrapper>
          <TopBar {...topBarProps} onHamburgerClick={showSidebar} />
        </TopBarWrapper>

        <ContentArea>
          <ContentWrapper>{children}</ContentWrapper>

          <OnThisPageWrapper>
            <OnThisPage topOfPageOffset={TOP_BAR_HEIGHT} />
          </OnThisPageWrapper>
        </ContentArea>

        <FooterWrapper>
          <Footer links={footerLinks} />
        </FooterWrapper>
      </MainArea>
    </>
  );
}
