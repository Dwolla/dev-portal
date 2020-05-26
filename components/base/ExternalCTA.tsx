import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { ReactComponent as NewTabIcon } from "../../assets/images/component-icons/open-in-new-tab-icon.svg";
import {
  GREY_2,
  GREY_4,
  WHITE_PRIMARY,
  HEADLINE_TEXT,
  PARAGRAPH_TEXT,
} from "../colors";
import { BOX_SHADOW_7 } from "../shadowDepths";
import { ROBOTO, POPPINS } from "../typography";

const Container = styled.a`
  text-decoration: none;
  position: relative;
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  border: 1px solid ${GREY_2};
  border-radius: 5px;
  background-color: ${WHITE_PRIMARY};
  cursor: pointer;
  :hover {
    box-shadow: ${BOX_SHADOW_7};
  }
`;
const StyledIcon = styled.img`
  flex-shrink: 0;
  height: 48px;
  width: 48px;
`;

const TextContainer = styled.div`
  margin: 0 10px 0 30px;
`;
const StyledTitle = styled.div`
  color: ${HEADLINE_TEXT};
  font-family: ${POPPINS};
  font-size: 18px;
  letter-spacing: 0;
  line-height: 26px;
  margin-bottom: 17px;
`;

const StyledDescription = styled.div`
  color: ${PARAGRAPH_TEXT};
  font-family: ${ROBOTO};
  font-size: 15px;
  letter-spacing: 0;
  line-height: 25px;
`;

const StyledNewTab = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  svg {
    g {
      fill: ${GREY_4};
    }
  }
`;

type Props = {
  icon: string;
  title?: string;
  description?: string;
  href: string;
};

function ExternalCTA({ icon, title, description, href }: Props) {
  return (
    <Link href={href} passHref>
      <Container>
        <StyledIcon src={icon} alt="" />
        <TextContainer>
          {title && <StyledTitle>{title}</StyledTitle>}
          {description && <StyledDescription>{description}</StyledDescription>}
        </TextContainer>
        <StyledNewTab>
          <NewTabIcon width={13} />
        </StyledNewTab>
      </Container>
    </Link>
  );
}

export default ExternalCTA;
