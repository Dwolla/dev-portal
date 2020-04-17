import styled from "@emotion/styled";

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
  size: "tiny" | "small" | "standard" | "large";
  variant: "primary" | "secondary" | "hollow-light" | "hollow-dark";
  type?: "button" | "submit" | "reset";
};

function Button({ text, size, variant, type = "button" }: Props) {
  return (
    <ButtonStyle type={type} className={`${variant} ${size}`}>
      {text}
    </ButtonStyle>
  );
}

const ButtonStyle = styled.button`
  color: ${WHITE_PRIMARY};
  font-family: ${POPPINS};
  font-style: thin;
  padding: 12px 15px;
  border-radius: 5px;
  cursor: pointer;
  :focus {
    outline: 0;
  }
  &.tiny {
    font-size: 11px;
    font-weight: 500;
  }
  &.small {
    font-size: 13px;
  }
  &.standard {
    font-size: 14px;
  }
  &.large {
    font-size: 16px;
  }

  &.primary {
    background-color: ${PURPLE_PRIMARY_BUTTON};
    border-color: transparent;

    :hover {
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

    :hover {
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
    :hover {
      border-color: ${GREY_5};
    }
  }
  &.hollow-dark {
    border: 1px solid ${WHITE_PRIMARY};
    color: ${WHITE_PRIMARY};
    background: transparent;
    :hover {
      background-color: ${WHITE_PRIMARY};
      color: ${PURPLE_DARK};
    }
  }
`;

export default Button;
