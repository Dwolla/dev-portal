import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { ReactComponent as ArrowIcon } from "../../../assets/images/component-icons/arrow-right.svg";
import {
  GREY_2,
  ORANGE_PRIMARY,
  WHITE_PRIMARY,
  PARAGRAPH_TEXT,
} from "../colors";
import { BOX_SHADOW_5 } from "../shadowDepths";
import { ROBOTO } from "../typography";

const StyledLink = styled.a`
  text-decoration: none;
`;
const Container = styled.div`
  text-decoration: none;
  max-width: 656px;
  box-sizing: border-box;
  border: 1px solid ${GREY_2};
  border-radius: 5px;
  background-color: ${WHITE_PRIMARY};
  display: flex;
  justify-content: space-between;
  align-items: center;
  :hover {
    box-shadow: ${BOX_SHADOW_5};
  }
`;
const StyledIcon = styled.img`
  margin: 15px 33px 15px 15px;
  height: 48px;
  width: 48px;
`;

const TextStyle = styled.div`
  color: ${PARAGRAPH_TEXT};
  font-family: ${ROBOTO};
  font-size: 15px;
  font-weight: 500;
  line-height: 25px;
  margin: 14px auto;
`;

const ArrowStyle = styled.div`
  margin: 19px;

  path.arrow-right_svg__point {
    fill: ${ORANGE_PRIMARY};
  }

  path.arrow-right_svg__stem {
    stroke: ${ORANGE_PRIMARY};
  }
`;

type Props = {
  icon: string;
  text: string;
  href: string;
};

function InlineCTA({ icon, text, href }: Props) {
  return (
    <Link href={href} passHref>
      <StyledLink>
        <Container>
          <StyledIcon src={icon} alt="" />
          <TextStyle>{text}</TextStyle>
          <ArrowStyle>
            <ArrowIcon width={13} />
          </ArrowStyle>
        </Container>
      </StyledLink>
    </Link>
  );
}

export default InlineCTA;
