import * as React from "react";
import styled from "@emotion/styled";
import { storiesOf } from "@storybook/react";
import Paginaton from "../../components/base/Pagination";
import { maxWidth, BREAKPOINT_MOBILE } from "../../components/breakpoints";

// Wrapper div to positiont the pagination links
const PaginationWrapper = styled.div`
  padding: 50px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &.center {
    top: 0;
    justify-content: center;
  }
  /* Previous and Next boxes are stacked on a smaller screen */
  @media (${maxWidth(BREAKPOINT_MOBILE)}) {
    flex-direction: column;
    a {
      margin: 10px 0;
    }
  }
`;

storiesOf("base|Pagination", module)
  .add("Next", () => (
    <PaginationWrapper className="center">
      <Paginaton variant="next" variantText="NEXT" href="#">
        Step 2: Adding a funding source
      </Paginaton>
    </PaginationWrapper>
  ))
  .add("Previous", () => (
    <PaginationWrapper className="center">
      <Paginaton variant="previous" variantText="PREVIOUS" href="#">
        Step 1: Creating Business Verified Customers
      </Paginaton>
    </PaginationWrapper>
  ))
  .add("Previous + Next", () => (
    <PaginationWrapper>
      <Paginaton variant="previous" variantText="PREVIOUS" href="#">
        Step 1: Creating Business Verified Customers
      </Paginaton>
      <Paginaton variant="next" variantText="NEXT" href="#">
        Step 3: Adding a funding sources
      </Paginaton>
    </PaginationWrapper>
  ));
