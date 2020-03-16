import Head from "next/head";
import { css, Global } from "@emotion/core";
import styled from "@emotion/styled";
import classnames from "classnames";
import SideNav, { SideNavLinkProps } from "./SideNav"; // eslint-disable-line no-unused-vars
import { GREY_2 } from "../colors";
import ApiStatus from "./ApiStatus";
import TopBar from "./TopBar";
import Footer, { FooterLink } from "./Footer"; // eslint-disable-line no-unused-vars
import { Page } from "../../modules/pages"; // eslint-disable-line no-unused-vars

// proptypes

interface LayoutProps {
  children: JSX.Element;
  pages: Page[];
  sideNavLinks: SideNavLinkProps[];
  footerLinks: Record<string, FooterLink[]>;
  topBarChildren: JSX.Element | JSX.Element[];
}

// components

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
`;

export default function Layout(props: LayoutProps) {
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
          <SideNav links={props.sideNavLinks} pages={props.pages} />
        </SideNavWrapper>

        <ApiStatus />
      </LeftSidebar>

      <MainArea>
        <TopBar>{props.topBarChildren}</TopBar>

        {props.children}

        <Footer links={props.footerLinks} />
      </MainArea>
    </>
  );
}
