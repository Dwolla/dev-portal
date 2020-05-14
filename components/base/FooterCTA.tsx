import React from "react";
import styled from "@emotion/styled";
import Button from "./Button";
import { PURPLE_DARK } from "../colors";
import { H2, SubHeader } from "./Typography";
import { breakDown } from "../breakpoints";

// Styles

const Container = styled.div`
  padding: 60px;
  width: 100%;
  background-color: ${PURPLE_DARK};
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (${breakDown("xs")}) {
    padding: 20px;
    flex-direction: column;
  }
`;

const StyledContent = styled.div`
  padding-right: 20px;
  > * {
    margin: 0;
    margin-bottom: 13px;
  }
  @media (${breakDown("xs")}) {
    margin-bottom: 15px;
    padding-right: unset;
    text-align: center;
  }
  /* Text sizes decrease in smaller screens */
  @media (${breakDown("sm")}) {
    > * {
      margin-bottom: 7px;
    }
    > h2 {
      font-size: 18px;
      line-height: 22px;
    }
    > p {
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
      <StyledContent>
        <H2 isDark>{topic}</H2>
        <SubHeader isDark>{description}</SubHeader>
      </StyledContent>
      <Button {...button} size="large" variant="primary" />
    </Container>
  );
}

export default FooterCTA;
