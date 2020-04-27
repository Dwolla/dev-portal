import React from "react";
import styled from "@emotion/styled";
import { GREY_5, GREY_4 } from "../colors";
import { POPPINS } from "../typography";

type Props = { text: string };

function Badge({ text }: Props) {
  return <StyledBadge>{text}</StyledBadge>;
}

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
`;

export default Badge;
