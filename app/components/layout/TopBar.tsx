import React, { useContext } from "react";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import Link from "next/link";
import { FormControl } from "@mui/material";
import { useRouter } from "next/router";
import SelectMui from "../base/SelectMui";
import Help from "../base/Help";
import Search from "../base/Search";
import { LanguageContext } from "../util/Contexts";
import { ROBOTO } from "../typography";
import { breakDown, breakUp } from "../breakpoints";
import { GREY_4, GREY_5, GREY_9, PURPLE_075, WHITE_PRIMARY } from "../colors";
import dwollaLogo from "../../../assets/images/dwolla-logo-full-color.png";
import { ReactComponent as CloseIcon } from "../../../assets/images/component-icons/close.svg";
import ga from "../../modules/ga";

export const TOP_BAR_HEIGHT = 66;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${TOP_BAR_HEIGHT}px;
  background-color: ${WHITE_PRIMARY};
  padding: 0 20px;

  @media (${breakDown("md")}) {
    padding: 12px 20px;
  }
`;

const LogoWrapper = styled.div`
  width: 23%;
  @media (${breakDown("md")}) {
    width: 30%;
  }
  @media (${breakDown("sm")}) {
    width: unset;
  }
`;

const StyledLogo = styled.img`
  width: 9rem;

  @media (${breakDown("xs")}) {
    max-width: 9rem;
  }
`;

const StyledEm = styled.em`
  position: relative;
  bottom: 13px;
  margin: 0 0 0 8px;
  padding: 1px 0 1px 8px;
  border-left: 1px solid ${PURPLE_075};
  color: ${PURPLE_075};

  font-family: ${ROBOTO};
  font-size: 1rem;
  font-weight: 400;
  font-style: normal;
  line-height: 150%;
  letter-spacing: 0.15px;
`;

const RightAlignWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;

  @media (${breakDown("md")}) {
    display: none;
  }
`;

const SearchBoxWrapper = styled.div`
  width: 30%;
  @media (${breakDown("sm")}) {
    display: none;
  }
`;

const HamburgerWrapper = styled.div`
  width: 25%;
  display: flex;
  justify-content: flex-end;
  @media (${breakUp("lg")}) {
    display: none;
  }
  @media (${breakDown("xs")}) {
    width: unset;
  }
`;

const Hamburger = styled.div`
  width: 15px;
  height: 12px;
  cursor: pointer;
  background-image: linear-gradient(
    to bottom,
    ${GREY_9},
    ${GREY_9} 16.67%,
    transparent 16.67%,
    transparent 41.67%,
    ${GREY_9} 41.67%,
    ${GREY_9} 58.33%,
    transparent 58.33%,
    transparent 83.33%,
    ${GREY_9} 83.33%,
    ${GREY_9} 100%
  );

  @media (${breakUp("lg")}) {
    display: none;
  }

  :focus {
    outline: none;
    opacity: 0.5;
  }

  &:hover,
  &.isFocused {
    opacity: 0.5;
  }
`;

const StyledCloseIcon = styled.div`
  cursor: pointer;
  margin-left: auto;
  svg {
    * {
      fill: ${GREY_9};
    }
  }

  :hover {
    svg {
      * {
        fill: ${GREY_5};
      }
    }
  }

  :focus {
    outline: none;
    svg {
      * {
        fill: ${GREY_4};
      }
    }
  }

  @media (${breakUp("lg")}) {
    display: none;
  }
`;

export type HelpLinkProps = {
  text: string;
  href: string;
};

export type TopBarButtonProps = {
  text: string;
  link: {
    href: string;
    external: boolean;
  };
};

export type TopBarProps = {
  helpLinks?: HelpLinkProps[];
  button: TopBarButtonProps;
  sidebarToggled?: boolean;
  setSidebarToggled?: Function;
};

export default function TopBar({
  helpLinks,
  button,
  sidebarToggled,
  setSidebarToggled,
}: TopBarProps) {
  const router = useRouter();
  const { selectedLanguage, setSelectedLanguage, languageOptions } =
    useContext(LanguageContext);

  // Check if the current route is exactly "/docs" (aka Homepage)
  const isHomepage = router.pathname === "/docs";
  // Check if the current route contains archived files
  const isArchived = router.pathname.startsWith("/archive");

  const showSidebar = () => setSidebarToggled(true);
  const hideSidebar = () => setSidebarToggled(false);

  function onHamburgerKeydown(e) {
    if (e.key === "Enter") showSidebar();
  }

  function onCloseIconKeydown(e) {
    if (e.key === "Enter") hideSidebar();
  }

  return (
    <Container>
      <LogoWrapper>
        <Link href="/docs">
          <a style={{ textDecoration: "none" }}>
            <StyledLogo src={dwollaLogo} alt="" />
            <StyledEm> Docs</StyledEm>
          </a>
        </Link>
      </LogoWrapper>

      {!isHomepage && (
        <SearchBoxWrapper>
          <Search />
        </SearchBoxWrapper>
      )}

      <RightAlignWrapper>
        {helpLinks && <Help links={helpLinks} />}

        <FormControl sx={{ minWidth: 200 }} size="small">
          <SelectMui
            label="Select Language"
            onChange={(value) => {
              setSelectedLanguage(value);
              ga("global language select", "language change", value);
            }}
            options={languageOptions}
            value={selectedLanguage.value}
          />
        </FormControl>

        <Button
          variant="contained"
          href={button.link.href}
          target={button.link.external ? "_blank" : undefined}
          color="secondary"
          size="small"
        >
          {button.text}
        </Button>
      </RightAlignWrapper>

      <HamburgerWrapper>
        {!isHomepage &&
          !isArchived &&
          (sidebarToggled === false ? (
            <Hamburger
              tabIndex={0}
              aria-labelledby="Open menu"
              onClick={showSidebar}
              onKeyDown={(keyPress) => onHamburgerKeydown(keyPress)}
            />
          ) : (
            <StyledCloseIcon
              tabIndex={0}
              aria-labelledby="Close menu"
              onClick={hideSidebar}
              onKeyDown={(keyPress) => onCloseIconKeydown(keyPress)}
            >
              <CloseIcon width={14} />
            </StyledCloseIcon>
          ))}
      </HamburgerWrapper>
    </Container>
  );
}
