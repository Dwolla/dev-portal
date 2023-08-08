import React from "react";
import styled from "@emotion/styled";
import {
  ORANGE_PRIMARY,
  PURPLE_023,
  PURPLE_087,
  WHITE_PRIMARY,
} from "../colors";
import { ROBOTO } from "../typography";

const StyledBadge = styled.div`
  color: ${PURPLE_087};
  font-family: ${ROBOTO};
  font-size: 13px;
  font-weight: 400;
  font-style: normal;
  letter-spacing: 0.16px;
  line-height: 18px;
  text-align: center;
  box-sizing: border-box;
  border: 1.3px solid ${PURPLE_023};
  border-radius: 15px;
  padding: 5px 7px;
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
