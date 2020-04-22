import React from "react";
import styled from "@emotion/styled";
import { ROBOTO } from "../typography";
import { HEADLINE_TEXT, PARAGRAPH_TEXT, GREY_1, GREY_2 } from "../colors";

// Styles for Table
const StyledTable = styled.div`
  overflow-x: scroll;
  white-space: nowrap;
  table {
    /* Separate borders to selectively apply border radius */
    border-collapse: separate;
    border-spacing: 0;
    text-align: left;
    font-family: ${ROBOTO};
  }
  th {
    color: ${HEADLINE_TEXT};
    font-size: 13px;
    font-weight: 500;
    line-height: 17px;
    padding: 11px 21px;
  }
  td {
    color: ${PARAGRAPH_TEXT};
    font-size: 14px;
    line-height: 20px;
    padding: 17px 21px;
    border-top: 1px solid ${GREY_2};
    border-bottom: 1px solid ${GREY_2};
    :nth-of-type(1) {
      border-left: 1px solid ${GREY_2};
    }
    :nth-last-of-type(1) {
      border-right: 1px solid ${GREY_2};
    }
  }
  /* Applying background-color to alternate rows  */
  tr:nth-of-type(even) {
    background-color: ${GREY_1};
  }
  /* Top-left td cell */
  tr:nth-of-type(2) td:nth-of-type(1) {
    border-radius: 5px 0 0 0;
  }
  /* Top-right td cell */
  tr:nth-of-type(2) td:nth-last-of-type(1) {
    border-radius: 0 5px 0 0;
  }
  /* Bottom-right td cell */
  tr:nth-last-of-type(1) td:nth-last-of-type(1) {
    border-radius: 0 0 5px 0;
  }
  /* Bottom-left td cell */
  tr:nth-last-of-type(1) td:nth-of-type(1) {
    border-radius: 0 0 0 5px;
  }
`;

// Prop types
type Props = {
  children: JSX.Element;
};

// Table component
export default function Table({ children }: Props) {
  return <StyledTable>{children}</StyledTable>;
}
