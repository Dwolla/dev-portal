import React, { useState, useLayoutEffect } from "react";
import styled from "@emotion/styled";
import { Link, animateScroll } from "react-scroll";
import classnames from "classnames";
import {
  GREY_2,
  GREY_5,
  GREY_6,
  HEADLINE_TEXT,
  ORANGE_PRIMARY,
} from "../colors";
import { ROBOTO, POPPINS } from "../typography";
import { useAnchors } from "../util/Anchors";
import { TOP_BAR_HEIGHT } from "../../components/layout/TopBar";
import { breakDown } from "../../components/breakpoints";

const { scrollToTop } = animateScroll;

const Container = styled.div`
  position: sticky;
  padding: 20px 0;
  top: ${({ topOfPageOffset }: { topOfPageOffset: number }) =>
    topOfPageOffset}px;
  width: 30%;
  height: 100%;
  max-height: calc(
    100vh -
      ${({ topOfPageOffset }: { topOfPageOffset: number }) => topOfPageOffset}px
  );
  flex-shrink: 0;
  overflow-y: scroll;

  :empty {
    display: none;
  }

  @media (${breakDown("sm")}) {
    display: none;
  }

  > a {
    display: block;
    padding-top: 8px;
    padding-bottom: 8px;
    color: ${GREY_6};
    font-family: ${ROBOTO};
    font-size: 13px;
    line-height: 19px;
    text-decoration: none;
    box-sizing: border-box;
    border-left: 1px solid ${GREY_2};
    cursor: pointer;

    :hover {
      color: ${HEADLINE_TEXT};
    }

    &.tab-1,
    &.tab-2 {
      padding-left: 15px;
    }

    &.tab-3 {
      padding-left: 30px;
    }

    &.tab-4 {
      padding-left: 45px;
    }

    &.tab-5,
    &.tab-6 {
      padding-left: 60px;
    }

    &.is-active {
      color: ${HEADLINE_TEXT};
      border-left: 1px solid ${ORANGE_PRIMARY};
    }
  }
`;

const Heading = styled.div`
  height: 16px;
  color: ${GREY_5};
  font-family: ${POPPINS};
  font-size: 11px;
  font-weight: 500;
  line-height: 17px;
  margin: 0px 0px 7px 1px;
`;

const PageTop = styled.div`
  color: ${GREY_6};
  font-family: ${ROBOTO};
  font-size: 13px;
  line-height: 19px;
  padding-top: 10px;
  cursor: pointer;

  :hover {
    color: ${HEADLINE_TEXT};
  }
`;

type Heading = { key: string; level: number; title: string };

function OnThisPage({
  topOfPageOffset = TOP_BAR_HEIGHT,
}: {
  topOfPageOffset?: number;
}) {
  const { anchors } = useAnchors();
  const [activeAnchor, setActiveAnchor] = useState(null);

  useLayoutEffect(() => {
    if (activeAnchor) {
      window.history.replaceState(null, null, `#${activeAnchor}`);
    }
  }, [activeAnchor]);

  if (anchors.length === 0) return null;

  return (
    <Container topOfPageOffset={topOfPageOffset}>
      <Heading>ON THIS PAGE</Heading>

      {anchors.map((a) => (
        <Link
          key={a.id}
          onSetActive={() => setActiveAnchor(a.id)}
          className={classnames(`tab-${a.level}`, {
            "is-active": activeAnchor === a.id,
          })}
          to={a.id}
          spy
          smooth
          offset={-topOfPageOffset}
          duration={500}
        >
          {a.text}
        </Link>
      ))}

      <PageTop onClick={scrollToTop}>Top of Page</PageTop>
    </Container>
  );
}

export default OnThisPage;
