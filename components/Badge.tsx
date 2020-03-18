import React from "react";
import styled from "@emotion/styled";
import { GREY_5, GREY_4 } from "./colors";

const Button = styled.a`
  color: ${GREY_5};
  font-family: "Poppins", sans-serif;
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

type Props = { text: string };

function Badge(props: Props) {
  return <Button>{props.text}</Button>;
}

export default Badge;
