import { useContext } from "react";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import Link from "next/link";
import { FormControl } from "@mui/material";
import { LanguageContext } from "../util/Contexts";
import { breakDown, breakUp } from "../breakpoints";
import { GREY_2, GREY_4, PURPLE_PRIMARY } from "../colors";
import dwollaDevLogo from "../../../assets/images/logo-developers.png";
import { ReactComponent as CloseIcon } from "../../../assets/images/component-icons/close.svg";
import ga from "../../modules/ga";
import SelectMui from "../base/SelectMui";

export const TOP_BAR_HEIGHT = 66;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: ${TOP_BAR_HEIGHT}px;
  background-color: ${PURPLE_PRIMARY};
  padding: 0 20px;

  @media (${breakDown("md")}) {
    padding: 12px 20px;
  }
`;

const StyledLogo = styled.img`
  width: 15rem;

  @media (${breakDown("xs")}) {
    max-width: 13rem;
  }
`;

const ButtonWrapper = styled.div`
  margin-left: auto;
  padding-right: 20px;

  @media (${breakDown("md")}) {
    display: none;
  }
`;

const SelectWrapper = styled.div`
  padding-left: 20px;

  @media (${breakDown("xs")}) {
    display: none;
  }
`;

export type TopBarButtonProps = {
  text: string;
  link: {
    href: string;
    external: boolean;
  };
};

export type TopBarProps = {
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
    ${GREY_2},
    ${GREY_2} 16.67%,
    transparent 16.67%,
    transparent 41.67%,
    ${GREY_2} 41.67%,
    ${GREY_2} 58.33%,
    transparent 58.33%,
    transparent 83.33%,
    ${GREY_2} 83.33%,
    ${GREY_2} 100%
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
      fill: ${GREY_2};
    }
  }

  :hover {
    svg {
      * {
        fill: ${GREY_4};
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
  button,
  sidebarToggled,
  setSidebarToggled,
}: TopBarProps) {
  const { selectedLanguage, setSelectedLanguage, languageOptions } =
    useContext(LanguageContext);

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
      <Link href="/">
        <a>
          <StyledLogo src={dwollaDevLogo} alt="" />
        </a>
      </Link>

      <SelectWrapper>
        <FormControl sx={{ minWidth: 200 }} size="small">
          <SelectMui
            color="white"
            label="Select Language"
            onChange={(value) => {
              setSelectedLanguage(value);
              ga("global language select", "language change", value);
            }}
            options={languageOptions}
            value={selectedLanguage.value}
          />
        </FormControl>
      </SelectWrapper>

      <ButtonWrapper>
        <Button
          variant="contained"
          href={button.link.href}
          target={button.link.external ? "_blank" : undefined}
          color="secondary"
          size="medium"
        >
          {button.text}
        </Button>
      </ButtonWrapper>

      {sidebarToggled === false ? (
        <Hamburger
          tabIndex={0}
          aria-labelledby="Open menu"
          onClick={showSidebar}
          onKeyDown={(keyPress) => onHamburgerKeydown(keyPress)}
          // onFocus={() => setIsFocused(true)}
          // onBlur={() => setIsFocused(false)}
        />
      ) : (
        <StyledCloseIcon
          tabIndex={0}
          aria-labelledby="Close menu"
          onClick={hideSidebar}
          onKeyDown={(keyPress) => onCloseIconKeydown(keyPress)}
          // onFocus={() => setIsFocused(true)}
          // onBlur={() => setIsFocused(false)}
        >
          <CloseIcon width={14} />
        </StyledCloseIcon>
      )}
    </Container>
  );
}
