import React, { useContext } from "react";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import Link from "next/link";
import { FormControl, styled as muiStyled } from "@mui/material";
import {
  AlgoliaAutocomplete,
  AlgoliaAutocompleteProps,
} from "algolia-search-components";
import { useRouter } from "next/router";
import Help from "../base/Help";
import { LanguageContext } from "../util/Contexts";
import { ROBOTO } from "../typography";
import { breakDown, breakUp } from "../breakpoints";
import { GREY_4, GREY_5, GREY_9, PURPLE_075, WHITE_PRIMARY } from "../colors";
import dwollaLogo from "../../../assets/images/dwolla-logo-full-color.png";
import { ReactComponent as CloseIcon } from "../../../assets/images/component-icons/close.svg";
import ga from "../../modules/ga";
import SelectMui from "../base/SelectMui";

export const TOP_BAR_HEIGHT = 66;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: ${TOP_BAR_HEIGHT}px;
  background-color: ${WHITE_PRIMARY};
  padding: 0 20px;

  @media (${breakDown("md")}) {
    padding: 12px 20px;
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

const AlgoliaSearchWrapper = muiStyled("div", { name: "SearchWrapper" })({
  display: "inline-block",
  paddingRight: "16px",
  verticalAlign: "middle",
});

const RightAlignWrapper = styled.div`
  display: flex;
  align-items: center;

  margin-left: auto;
  padding-right: 20px;

  div {
    margin-right: 10px;
  }

  @media (${breakDown("md")}) {
    display: none;
  }
`;

const LeftAlignWrapper = styled.div`
  padding-left: 30px;
  margin-right: 20px;

  @media (${breakDown("xs")}) {
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
  algoliaSearch?: AlgoliaAutocompleteProps;
  button: TopBarButtonProps;
  sidebarToggled?: boolean;
  setSidebarToggled?: Function;
};

const Hamburger = styled.div`
  width: 15px;
  height: 12px;
  margin-left: auto;
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

export default function TopBar({
  helpLinks,
  algoliaSearch,
  button,
  sidebarToggled,
  setSidebarToggled,
}: TopBarProps) {
  const router = useRouter();
  const { selectedLanguage, setSelectedLanguage, languageOptions } =
    useContext(LanguageContext);

  // Check if the current route is exactly "/docs" (aka Homepage)
  const isExactlyDocs = router.pathname === "/docs";

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
      <Link href="/docs">
        <a style={{ textDecoration: "none" }}>
          <StyledLogo src={dwollaLogo} alt="" />
          <StyledEm> Docs</StyledEm>
        </a>
      </Link>

      <LeftAlignWrapper>
        {algoliaSearch && (
          <AlgoliaSearchWrapper>
            <AlgoliaAutocomplete {...algoliaSearch} />
          </AlgoliaSearchWrapper>
        )}
      </LeftAlignWrapper>

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
          size="medium"
        >
          {button.text}
        </Button>
      </RightAlignWrapper>

      {!isExactlyDocs &&
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
    </Container>
  );
}
