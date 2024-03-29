import React from "react";
import styled from "@emotion/styled";
import Pagination from "../base/Pagination";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    flex-basis: 150px;
  }
`;

type Props = {
  prevTitle: string;
  prevHref: string;
  nextTitle: string;
  nextHref: string;
};

function NextBackPagination({
  prevTitle,
  prevHref,
  nextTitle,
  nextHref,
}: Props) {
  return (
    <StyledWrapper>
      {prevTitle && prevHref && (
        <Pagination variant="previous" variantText="Previous" href={prevHref}>
          {prevTitle}
        </Pagination>
      )}
      <div></div>
      {nextTitle && nextHref && (
        <Pagination variant="next" variantText="Next" href={nextHref}>
          {nextTitle}
        </Pagination>
      )}
    </StyledWrapper>
  );
}

export default NextBackPagination;
