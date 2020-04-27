import React from "react";
import styled from "@emotion/styled";
import Button from "./Button";
import { PURPLE_DARK } from "../colors";
import { H2, SubHeader } from "./Typography";
import { maxWidth, BREAKPOINT_IPAD, BREAKPOINT_MOBILE } from "../breakpoints";

// Styles

const Container = styled.div`
  padding: 60px;
  width: 100%;
  background-color: ${PURPLE_DARK};
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (${maxWidth(BREAKPOINT_MOBILE)}) {
    padding: 10px;
    flex-direction: column;
  }
  /* Text sizes decrease in smaller screens */
  > div > h2 {
    @media (${maxWidth(BREAKPOINT_IPAD)}) {
      font-size: 18px;
      line-height: 22px;
    }
  }
  > div > span {
    @media (${maxWidth(BREAKPOINT_IPAD)}) {
      font-size: 16px;
      line-height: 20px;
    }
  }
`;

// Props
type ButtonProps = {
  text: string;
};
type Props = { topic: string; description: string; button?: ButtonProps };

function FooterCTA({ topic, description, button }: Props) {
  return (
    <Container>
      <div>
        <H2 isDark>{topic}</H2>
        <SubHeader isDark>{description}</SubHeader>
      </div>
      <Button {...button} size="large" variant="primary" />
    </Container>
  );
}

export default FooterCTA;
