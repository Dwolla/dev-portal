import { useContext } from "react";
import styled from "@emotion/styled";
import classnames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import openInNewTabIcon from "../../public/images/open-in-new-tab-icon.svg";
import { GREY_2, GREY_6, ORANGE_PRIMARY } from "../colors";
import { POPPINS } from "../typography";
import Button from "../base/Button";
import Select from "../base/select/Select";
import { LanguageContext } from "../util/Contexts";
import { BREAKPOINT_DESKTOP, minWidth } from "../breakpoints";

export const TOP_BAR_HEIGHT = 68;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: ${TOP_BAR_HEIGHT}px;
  border-bottom: 1px solid ${GREY_2};
  background: rgba(255, 255, 255, 0.98);
  padding: 0 20px;
`;

const ButtonWrapper = styled.div`
  margin-left: auto;
  padding-right: 20px;
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
  }

  &.active > .text {
    color: ${ORANGE_PRIMARY};
    border-bottom-color: ${ORANGE_PRIMARY};
  }

  :hover:not(.active) > .text {
    text-decoration: underline;
  }
`;

type TopBarLinkProps = {
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
          <img
            className="icon"
            src={openInNewTabIcon}
            alt="Open in new tab"
            width={13}
            height={13}
          />
        )}
      </StyledLink>
    </Link>
  );
}

export type TopBarButtonProps = {
  text: string;
};

export type TopBarProps = {
  button: TopBarButtonProps;
  links: TopBarLinkProps[];
  onHamburgerClick?: () => void;
};

const Hamburger = styled.div`
  width: 15px;
  height: 12px;
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

  @media (${minWidth(BREAKPOINT_DESKTOP)}) {
    display: none;
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

  const router = useRouter();

  return (
    <Container>
      {links.map((l) => (
        <TopBarLink
          key={l.href}
          {...l}
          active={l.active || l.href === router?.pathname}
        />
      ))}

      <SelectWrapper>
        <Select
          options={languageOptions}
          selectedValue={selectedLanguage}
          setSelectedValue={setSelectedLanguage}
          autoWidth
        />
      </SelectWrapper>

      <ButtonWrapper>
        <Button {...button} size="standard" variant="primary" />
      </ButtonWrapper>

      {onHamburgerClick && <Hamburger onClick={onHamburgerClick} />}
    </Container>
  );
}
