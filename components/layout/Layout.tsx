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
import { breakUp } from "../breakpoints";
import TopBar, { TopBarProps } from "./TopBar"; // eslint-disable-line no-unused-vars
import Footer, { FooterLink } from "./Footer"; // eslint-disable-line no-unused-vars
import APIStatusBar from "./APIStatusBar";
import closeIcon from "../../assets/images/component-icons/close.svg";
import dwollaDevLogo from "../../assets/images/dwolla-developers-logo.png";

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

  @media (${breakUp("lg")}) {
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
  @media (${breakUp("lg")}) {
    margin-left: 25%;
  }
`;

const ContentArea = styled.div`
  @media (${breakUp("lg")}) {
    margin-right: 40px;
  }
`;

const TopBarWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 99;
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
            src={closeIcon}
            alt=""
            onClick={hideSidebar}
            css={css`
              width: 14px;
              float: right;
              transform: translate3d(0, 15px, 0);

              @media (${breakUp("lg")}) {
                display: none;
              }
            `}
          />

          <img src={dwollaDevLogo} alt="Dwolla Developers Logo" />
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

        <ContentArea>{children}</ContentArea>

        <FooterWrapper>
          <Footer links={footerLinks} />
        </FooterWrapper>
      </MainArea>
    </>
  );
}
