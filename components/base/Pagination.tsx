import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import arrowLeft from "../../assets/images/component-icons/arrow-left.svg";
import arrowRight from "../../assets/images/component-icons/arrow-right.svg";
import { GREY_2, GREY_5, GREY_6, WHITE_PRIMARY } from "../colors";
import { BOX_SHADOW_5 } from "../shadowDepths";
import { ROBOTO, POPPINS } from "../typography";
import { breakUp } from "../breakpoints";

// Styles
const StyledAnchor = styled.a`
  text-decoration: none;
`;

const Container = styled.div`
  box-sizing: border-box;
  height: 100%;
  min-height: 107px;
  max-width: 200px;
  border: 1px solid ${GREY_2};
  border-radius: 5px;
  background-color: ${WHITE_PRIMARY};
  padding: 21px;
  span {
    color: ${GREY_6};
    font-family: ${ROBOTO};
    font-size: 13px;
    line-height: 21px;
    margin: 0;
  }
  :hover {
    box-shadow: ${BOX_SHADOW_5};
  }
  &.next {
    text-align: left;
    margin-left: 15px;
  }
  &.previous {
    text-align: right;
    margin-right: 15px;
  }

  @media (${breakUp("sm")}) {
    width: 200px;
  }
`;

const ArrowDiv = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${GREY_5};
  text-transform: uppercase;
  font-family: ${POPPINS};
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.79px;
  line-height: 17px;
  margin-bottom: 11px;
`;

const ArrowIcon = styled.img`
  width: 13px;
`;

// Prop types
type Props = {
  variant: "next" | "previous";
  variantText: string;
  href: string;
  children: string;
};

// Pagination component
function Pagination({ variant, variantText, href, children }: Props) {
  return (
    <Link href={href} passHref>
      <StyledAnchor>
        <Container className={variant}>
          {variant === "next" ? (
            <ArrowDiv>
              {variantText}
              <ArrowIcon src={arrowRight} alt="Next" />
            </ArrowDiv>
          ) : (
            <ArrowDiv>
              <ArrowIcon src={arrowLeft} alt="Previous" />
              {variantText}
            </ArrowDiv>
          )}
          <span>{children}</span>
        </Container>
      </StyledAnchor>
    </Link>
  );
}
export default Pagination;
