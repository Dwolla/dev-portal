import React from "react";
import styled from "@emotion/styled";
import { GREY_5, GREY_4, WHITE_PRIMARY, ORANGE_PRIMARY } from "../colors";
import { POPPINS } from "../typography";

const StyledBadge = styled.div`
  text-transform: uppercase;
  color: ${GREY_5};
  font-family: ${POPPINS};
  font-size: 10px;
  font-weight: 500;
  font-style: normal;
  letter-spacing: 0.4px;
  line-height: 16px;
  text-align: center;
  box-sizing: border-box;
  height: 20px;
  border: 1px solid ${GREY_4};
  border-radius: 10px;
  padding: 2px 5.15px;
  &.orange {
    background-color: ${ORANGE_PRIMARY};
    border-color: ${ORANGE_PRIMARY};
    border-radius: 15px;
    color: ${WHITE_PRIMARY};
    font-size: 13px;
    letter-spacing: 0;
    height: 22px;
    padding: 2px 8px;
  }
`;

type Props = { text: string; variant?: "default" | "orange" };

function Badge({ text, variant }: Props) {
  return <StyledBadge className={variant}>{text}</StyledBadge>;
}
export default Badge;
