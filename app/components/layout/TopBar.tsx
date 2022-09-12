import { useContext, useState } from "react";
import styled from "@emotion/styled";
import classnames from "classnames";
import Link from "next/link";
import { GREY_2 } from "../colors";
import Button from "../base/Button";
import Select from "../base/select/Select";
import { LanguageContext } from "../util/Contexts";
import { breakUp, breakDown } from "../breakpoints";
import dwollaDevLogo from "../../../assets/images/dwolla-developers-logo.svg";
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

const StyledLogoWrap = styled.div`
  @media (${breakUp("lg")}) {
    display: none;
  }
`;

const StyledLogo = styled.img`
  max-height: 100%;

  @media (${breakDown("xs")}) {
    max-width: 115px;
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

export type TopBarButtonProps = {
  text: string;
  link: {
    href: string;
    external: boolean;
  };
};

export type TopBarProps = {
  button: TopBarButtonProps;
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

export default function TopBar({ button, onHamburgerClick }: TopBarProps) {
  const { selectedLanguage, setSelectedLanguage, languageOptions } =
    useContext(LanguageContext);

  const [isFocused, setIsFocused] = useState(false);

  function onHamburgerKeydown(e) {
    if (e.key === "Enter") onHamburgerClick();
  }

  return (
    <Container>
      <StyledLogoWrap>
        <Link href="/">
          <a>
            <StyledLogo src={dwollaDevLogo} alt="" />
          </a>
        </Link>
      </StyledLogoWrap>

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
