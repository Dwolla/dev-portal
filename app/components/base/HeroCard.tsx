import React from "react";
import styled from "@emotion/styled";
import Button from "./Button";
import { breakDown } from "../breakpoints";
import {
  PURPLE_MEDIUM,
  PURPLE_DARK,
  WHITE_PRIMARY,
  GREY_13,
  GREY_1,
} from "../colors";
import { POPPINS, ROBOTO } from "../typography";

const Container = styled.div`
  width: 289px;
  background: ${PURPLE_MEDIUM};
  border-radius: 4px;
  padding: 25px;
  font-family: ${POPPINS};

  @media (${breakDown("xs")}) {
    width: auto;
    border-radius: unset;
    text-align: center;
    background: ${PURPLE_DARK};
  }
`;

const StyledTitle = styled.div`
  font-family: ${POPPINS};
  font-style: normal;
  font-weight: 200;
  font-size: 24px;
  line-height: 111%;
  color: ${WHITE_PRIMARY};
  margin-bottom: 12px;
`;

const StyledDescription = styled.div`
  font-family: ${ROBOTO};
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 134%;
  color: ${GREY_13};
  margin-bottom: 35px;
`;

const StyledButton = styled.div`
  margin-bottom: 11px;
`;

const StyledLink = styled.div`
  margin: 8px 0;
  @media (${breakDown("xs")}) {
    margin: 15px 0;
  }
`;

const StyledAnchor = styled.a`
  height: 11px;
  font-family: ${POPPINS};
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 111%;
  color: ${GREY_1};
  text-decoration: none;
  :hover,
  :focus {
    outline: 0;
    text-decoration: underline;
  }
`;

type ButtonProps = {
  text: string;
  link: {
    href: string;
    external: boolean;
  };
};

type LinkProps = { text: string; href: string };

type Props = {
  topic: string;
  description: string;
  button?: ButtonProps;
  links?: Array<LinkProps>;
};

function HeroCard({ topic, description, button, links }: Props) {
  return (
    <Container>
      <StyledTitle>{topic}</StyledTitle>
      <StyledDescription>{description}</StyledDescription>
      {button && (
        <StyledButton>
          <Button {...button} size="standard" variant="hollow-white" />
        </StyledButton>
      )}
      {links &&
        links.map((link) => (
          <StyledLink>
            <StyledAnchor href={link.href}>{link.text} &gt;</StyledAnchor>
          </StyledLink>
        ))}
    </Container>
  );
}

export default HeroCard;
