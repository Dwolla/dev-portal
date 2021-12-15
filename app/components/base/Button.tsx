import styled from "@emotion/styled";
import { css } from "@emotion/core";
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
    background: ${WHITE_PRIMARY};
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
  &.hollow-white {
    border: 1px solid transparent;
    background: ${WHITE_PRIMARY};
    color: #2d2d48;
    :hover,
    :focus {
      border-color: ${GREY_5};
    }
  }
  &.disabled {
    background-color: ${GREY_4};
    :hover,
    :focus {
      background-color: ${GREY_4};
      box-shadow: none;
    }
    cursor: not-allowed;
  }
`;

const StyledButton = styled.button`
  ${buttonStyles}
`;

const StyledLink = styled.a`
  ${buttonStyles}
  display: inline-block;
`;

type Props = {
  text: string;
  size: "tiny" | "small" | "standard" | "large" | "block";
  variant:
    | "primary"
    | "secondary"
    | "hollow-light"
    | "hollow-dark"
    | "hollow-white";
  type?: "button" | "submit" | "reset";
  link?: { href: string; external?: boolean };
  isDisabled?: boolean;
  onButtonClick?: any;
};

const Button = ({
  text,
  size,
  variant,
  type = "button",
  link,
  isDisabled,
  onButtonClick,
}: Props) =>
  link && link.href ? (
    <ButtonLink text={text} size={size} variant={variant} link={link} />
  ) : (
    <StyledButton
      type={type}
      className={`${variant} ${size} ${isDisabled ? "disabled" : ""}`}
      disabled={isDisabled}
      onClick={onButtonClick}
    >
      {text}
    </StyledButton>
  );

const ButtonLink = ({
  text,
  size,
  variant,
  link,
  isDisabled,
  onButtonClick,
}: Props) => (
  <StyledLink
    href={link.href}
    target={link.external && "_blank"}
    className={`${variant} ${size} ${isDisabled ? "disabled" : ""}`}
    onClick={onButtonClick}
  >
    {text}
  </StyledLink>
);

export default Button;
