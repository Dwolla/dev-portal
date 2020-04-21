import Head from "next/head";
import { css, Global } from "@emotion/core";
import styled from "@emotion/styled";
import classnames from "classnames";
import SideNav, { SideNavLinkProps } from "./SideNav"; // eslint-disable-line no-unused-vars
import { GREY_2, WHITE_PRIMARY } from "../colors";
import TopBar, { TOP_BAR_HEIGHT, TopBarProps } from "./TopBar"; // eslint-disable-line no-unused-vars
import Footer, { FooterLink } from "./Footer"; // eslint-disable-line no-unused-vars
import OnThisPage from "./OnThisPage";
import APIStatusBar from "./APIStatusBar";

export const LEFT_SIDEBAR_PADDING_X = "20px";

const LeftSidebar = styled.div`
  position: fixed;
  top: 0;
  right: 10%;
  bottom: 0;
  left: 0;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid ${GREY_2};
  transform: translate3d(-100%, 0, 0);
  transition: transform 0.2s ease-in-out;

  @media (min-width: 980px) {
    right: 75%;
    transform: translate3d(0, 0, 0);
  }

  &.toggled {
    transform: translate3d(0, 0, 0);

    @media (min-width: 980px) {
      right: 75%;
    }
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
  @media (min-width: 980px) {
    margin-left: 25%;
  }

  display: grid;
  grid-template-columns: 70% 30%;
  grid-template-rows: auto;
  grid-template-areas:
    "top-bar top-bar"
    "content sidebar"
    "footer footer";
`;

const TopBarWrapper = styled.div`
  grid-area: top-bar;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const OnThisPageWrapper = styled.div`
  grid-area: sidebar;
  position: sticky;
  top: ${TOP_BAR_HEIGHT}px;
  max-height: calc(100vh - ${TOP_BAR_HEIGHT}px);
  overflow-y: scroll;

  :empty {
    display: none;
  }
`;

const ContentWrapper = styled.div`
  grid-area: content;
  overflow: hidden;
`;

const FooterWrapper = styled.div`
  grid-area: footer;
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
  const sidebarToggled = false;

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
          <TopBar {...topBarProps} />
        </TopBarWrapper>

        <OnThisPageWrapper>
          <OnThisPage topOfPageOffset={TOP_BAR_HEIGHT} />
        </OnThisPageWrapper>

        <ContentWrapper>{children}</ContentWrapper>

        <FooterWrapper>
          <Footer links={footerLinks} />
        </FooterWrapper>
      </MainArea>
    </>
  );
}
