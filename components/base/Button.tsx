import styled from "@emotion/styled";
import { css } from "@emotion/core";
import Link from "next/link";
import {
  WHITE_PRIMARY,
  PURPLE_PRIMARY_BUTTON,
  PURPLE_PRIMARY_HOVER,
  PURPLE_PRIMARY_ACTIVE,
  PINK_SECONDARY_BUTTON,
  PINK_SECONDARY_HOVER,
  PINK_SECONDARY_ACTIVE,
  GREY_4,
  GREY_9,
  GREY_5,
  PURPLE_DARK,
} from "../colors";
import { BOX_SHADOW_6 } from "../shadowDepths";
import { POPPINS } from "../typography";

type Props = {
  text: string;
  size: "tiny" | "small" | "standard" | "large" | "block";
  variant: "primary" | "secondary" | "hollow-light" | "hollow-dark";
  type?: "button" | "submit" | "reset";
  link?: { href: string; external: boolean };
};

const Button = ({ text, size, variant, type = "button", link }: Props) =>
  link && link.href ? (
    <ButtonLink text={text} size={size} variant={variant} link={link} />
  ) : (
    <StyledButton type={type} className={`${variant} ${size}`}>
      {text}
    </StyledButton>
  );

const buttonStyles = css`
  color: ${WHITE_PRIMARY};
  font-family: ${POPPINS};
  font-style: thin;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  :focus {
    outline: 0;
  }
  &.tiny {
    padding: 5px 11px;
    font-size: 11px;
    font-weight: 500;
  }
  &.small {
    padding: 5px 15px;
    font-size: 13px;
  }
  &.standard {
    padding: 10px 15px;
    font-size: 14px;
  }
  &.large {
    padding: 15px 25px;
    font-size: 16px;
  }
  &.block {
    padding: 10px 15px;
    font-size: 14px;
    display: block;
    width: 100%;
    text-align: center;
  }

  &.primary {
    background-color: ${PURPLE_PRIMARY_BUTTON};
    border-color: transparent;

    :hover,
    :focus {
      background-color: ${PURPLE_PRIMARY_HOVER};
      box-shadow: ${BOX_SHADOW_6};
    }

    :active {
      background-color: ${PURPLE_PRIMARY_ACTIVE};
    }
  }
  &.secondary {
    background-color: ${PINK_SECONDARY_BUTTON};
    border-color: transparent;

    :hover,
    :focus {
      background-color: ${PINK_SECONDARY_HOVER};
      box-shadow: ${BOX_SHADOW_6};
    }

    :active {
      background-color: ${PINK_SECONDARY_ACTIVE};
    }
  }
  &.hollow-light {
    border: 1px solid ${GREY_4};
    color: ${GREY_9};
    :hover,
    :focus {
      border-color: ${GREY_5};
    }
  }
  &.hollow-dark {
    border: 1px solid ${WHITE_PRIMARY};
    color: ${WHITE_PRIMARY};
    background: transparent;
    :hover,
    :focus {
      background-color: ${WHITE_PRIMARY};
      color: ${PURPLE_DARK};
    }
  }
`;

const StyledButton = styled.button`
  ${buttonStyles}
`;

const StyledLink = styled.a`
  ${buttonStyles}
`;

const ButtonLink = ({ text, size, variant, link }: Props) => (
  <Link href={link.href} passHref>
    <StyledLink
      target={link.external && "_blank"}
      className={`${variant} ${size}`}
    >
      {text}
    </StyledLink>
  </Link>
);

export default Button;
