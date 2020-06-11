import React from "react";
import styled from "@emotion/styled";
import { ROBOTO } from "../typography";
import { HEADLINE_TEXT, PARAGRAPH_TEXT, GREY_1, GREY_2 } from "../colors";
import { breakUp } from "../breakpoints";

// Styles for Table
const StyledTable = styled.div`
  overflow-x: scroll;
  white-space: nowrap;
  /* This allows text within cells to wrap around on larger screens */
  @media (${breakUp("lg")}) {
    white-space: unset;
  }

  table {
    /* Separate borders to selectively apply border radius */
    width: 100%;
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
    text-align: left;
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
      /* This ensures the last column width doesn't shrink to a point where the text wraps around each word */
      @media (${breakUp("lg")}) {
        min-width: 20ch;
      }
    }
  }
  /* Applying background-color to alternate rows  */
  tr:nth-of-type(even) {
    background-color: ${GREY_1};
  }

  /* td border-radius */
  tbody {
    tr {
      &:nth-of-type(1) {
        td {
          &:nth-of-type(1) {
            border-top-left-radius: 5px;
          }
          &:last-of-type {
            border-top-right-radius: 5px;
          }
        }
      }
      &:last-of-type {
        td {
          &:nth-of-type(1) {
            border-bottom-left-radius: 5px;
          }
          &:last-of-type {
            border-bottom-right-radius: 5px;
          }
        }
      }
    }
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
