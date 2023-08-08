import React from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { POPPINS, ROBOTO } from "../typography";
import { breakDown } from "../breakpoints";
import { PURPLE_075, PURPLE_087 } from "../colors";

// Styles

const Container = styled.div`
  padding: 64px;
  max-height: 286px;
  width: 100%;
  background-color: rgba(244, 247, 251, 1);
  border-radius: 20px;

  @media (${breakDown("xs")}) {
    padding: 30px;
  }
`;

const StyledTopic = styled.div`
  font-family: ${POPPINS};
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 123.5%;
  color: ${PURPLE_087};

  margin-bottom: 24px;

  @media (${breakDown("xs")}) {
    font-size: 18px;
    line-height: 22px;

    margin-bottom: 15px;
  }
`;

const StyledDescription = styled.div`
  font-family: ${ROBOTO};
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 175%;
  letter-spacing: 0.15px;
  color: ${PURPLE_075};

  margin-bottom: 30px;

  @media (${breakDown("xs")}) {
    font-size: 12px;
    line-height: 20px;

    margin-bottom: 10px;
  }
`;

// Props
type ButtonProps = {
  text: string;
  link?: {
    href: string;
    external: boolean;
  };
};
type Props = { topic: string; description: string; button?: ButtonProps };

function FooterCTA({ topic, description, button }: Props) {
  return (
    <Container>
      <StyledTopic>{topic}</StyledTopic>
      <StyledDescription>{description}</StyledDescription>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        href={button.link.href}
      >
        {button.text}
      </Button>
    </Container>
  );
}

export default FooterCTA;
