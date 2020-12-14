import React from "react";
import styled from "@emotion/styled";
import caretLeft from "../../assets/images/component-icons/caret-left.svg";
import { breakDown } from "../breakpoints";
import {
  GREY_1,
  GREY_2,
  GREY_5,
  PARAGRAPH_TEXT,
  CODE_BLOCK_BLACK,
  WHITE_PRIMARY,
  ORANGE_PRIMARY,
} from "../colors";
import { ROBOTO } from "../typography";

const StyledContainer = styled.div`
  box-sizing: border-box;
  height: 50px;
  width: 100%;
  border: 1px solid ${GREY_2};
  border-radius: 5px;
  background-color: ${WHITE_PRIMARY};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledArrowDiv = styled.div`
  display: flex;
  height: 19px;
  margin: 0 10px;
  opacity: 0.5;
  color: ${PARAGRAPH_TEXT};
  font-family: ${ROBOTO};
  font-size: 14px;
  letter-spacing: 0;
  line-height: 19px;
  text-decoration: none;
  cursor: pointer;
  :focus,
  :hover {
    color: ${CODE_BLOCK_BLACK};
  }
`;

const ArrowIcon = styled.img`
  width: 8px;
  margin: 0 10px;
`;

const StyledUL = styled.ul`
  margin: unset;
  padding: unset;
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0 10px;
  @media (${breakDown("xs")}) {
    display: none;
  }
`;

const StyledPageLink = styled.a`
  height: 30px;
  width: 30px;
  padding: 6px;
  color: ${ORANGE_PRIMARY};
  font-family: ${ROBOTO};
  font-size: 14px;
  letter-spacing: 0;
  line-height: 19px;
  text-align: center;
  text-decoration: none;
  :focus,
  :hover {
    outline: 0;
    border-radius: 5px;
    background-color: ${GREY_1};
    color: ${GREY_5};
  }
`;

type Props = {
  totalPages: number;
  newerLabel: string;
  olderLabel: string;
};

function NumberedPagination({ totalPages, newerLabel, olderLabel }: Props) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i += 1) {
    pageNumbers.push(i);
  }
  return (
    <StyledContainer>
      <StyledArrowDiv>
        <ArrowIcon src={caretLeft} alt={newerLabel} />
        {newerLabel}
      </StyledArrowDiv>
      <StyledUL>
        {pageNumbers.map((item) => (
          <StyledPageLink key={item} href="#">
            {item}
          </StyledPageLink>
        ))}
      </StyledUL>
      <StyledArrowDiv>
        {olderLabel}
        <ArrowIcon
          src={caretLeft}
          alt={olderLabel}
          style={{ transform: "rotate(180deg)" }}
        />
      </StyledArrowDiv>
    </StyledContainer>
  );
}
export default NumberedPagination;
