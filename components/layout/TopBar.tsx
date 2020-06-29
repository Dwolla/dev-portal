import { useContext, useState } from "react";
import styled from "@emotion/styled";
import classnames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import openInNewTabIcon from "../../assets/images/component-icons/open-in-new-tab-icon.svg";
import { GREY_2, GREY_6, ORANGE_PRIMARY } from "../colors";
import { POPPINS } from "../typography";
import Button from "../base/Button";
import Select from "../base/select/Select";
import { LanguageContext } from "../util/Contexts";
import { breakUp, breakDown } from "../breakpoints";
import dwollaDevLogo from "../../assets/images/dwolla-developers-logo.svg";
import ga from "../../modules/ga";

export const TOP_BAR_HEIGHT = 68;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: ${TOP_BAR_HEIGHT}px;
  border-bottom: 1px solid ${GREY_2};
  background: rgba(255, 255, 255, 0.98);
  padding: 0 20px;

  @media (${breakDown("md")}) {
    padding: 12px 20px;
  }
`;

const StyledLogo = styled.img`
  max-height: 100%;

  @media (${breakUp("lg")}) {
    display: none;
  }

  @media (${breakDown("xs")}) {
    max-width: 115px;
  }
`;

const LinksWrapper = styled.div`
  height: 100%;

  @media (${breakDown("md")}) {
    display: none;
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
`;

const StyledLink = styled.a`
  font-family: ${POPPINS};
  font-size: 14px;
  color: ${GREY_6};
  display: inline-flex;
  align-items: center;
  padding: 0 20px;
  height: 100%;
  text-decoration: none;

  > .text {
    display: inline-flex;
    align-items: center;
    height: 100%;
    border-bottom: 3px solid transparent;
  }

  > .icon {
    margin-left: 5px;
    width: 13px;
    height: 13px;
  }

  &.active > .text {
    color: ${ORANGE_PRIMARY};
    border-bottom-color: ${ORANGE_PRIMARY};
  }

  :hover:not(.active) > .text {
    text-decoration: underline;
  }
`;

export type TopBarLinkProps = {
  href: string;
  external?: boolean;
  text: string;
  // manually set a link as active as opposed to relying on useRouter().pathname
  active?: boolean;
};

export function TopBarLink({ href, external, text, active }: TopBarLinkProps) {
  return (
    <Link href={href} passHref>
      <StyledLink
        target={external && "_blank"}
        className={classnames({ active })}
      >
        <span className="text">{text}</span>

        {external && (
          <img className="icon" src={openInNewTabIcon} alt="Open in new tab" />
        )}
      </StyledLink>
    </Link>
  );
}

export type TopBarButtonProps = {
  text: string;
  link: {
    href: string;
    external: boolean;
  };
};

export type TopBarProps = {
  button: TopBarButtonProps;
  links: TopBarLinkProps[];
  onHamburgerClick?: () => void;
};

const Hamburger = styled.div`
  width: 15px;
  height: 12px;
  margin-left: auto;
  cursor: pointer;
  background-image: linear-gradient(
    to bottom,
    #000,
    #000 16.67%,
    transparent 16.67%,
    transparent 41.67%,
    #000 41.67%,
    #000 58.33%,
    transparent 58.33%,
    transparent 83.33%,
    #000 83.33%,
    #000 100%
  );

  @media (${breakUp("lg")}) {
    display: none;
  }

  :focus {
    outline: none;
  }

  &:hover,
  &.isFocused {
    opacity: 0.5;
  }
`;

export default function TopBar({
  button,
  links,
  onHamburgerClick,
}: TopBarProps) {
  const { selectedLanguage, setSelectedLanguage, languageOptions } = useContext(
    LanguageContext
  );

  const [isFocused, setIsFocused] = useState(false);

  function onHamburgerKeydown(e) {
    if (e.key === "Enter") onHamburgerClick();
  }
  const router = useRouter();

  return (
    <Container>
      <Link href="/">
        <a>
          <StyledLogo src={dwollaDevLogo} alt="" />
        </a>
      </Link>

      <LinksWrapper>
        {links.map((l) => (
          <TopBarLink
            key={l.href}
            {...l}
            active={l.active || l.href === router?.pathname}
          />
        ))}
      </LinksWrapper>

      <SelectWrapper>
        <Select
          options={languageOptions}
          selectedValue={selectedLanguage}
          setSelectedValue={(language) => {
            setSelectedLanguage(language);
            ga("global language select", "language change", language.value);
          }}
          autoWidth
        />
      </SelectWrapper>

      <ButtonWrapper>
        <Button {...button} size="standard" variant="primary" />
      </ButtonWrapper>

      {onHamburgerClick && (
        <Hamburger
          tabIndex={0}
          aria-labelledby="Open menu"
          className={classnames({ isFocused })}
          onClick={onHamburgerClick}
          onKeyDown={(keyPress) => onHamburgerKeydown(keyPress)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      )}
    </Container>
  );
}
