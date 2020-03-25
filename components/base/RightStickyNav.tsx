import React from "react";
import styled from "@emotion/styled";
import { Link, animateScroll } from "react-scroll";
import {
  GREY_2,
  GREY_5,
  GREY_6,
  HEADLINE_TEXT,
  ORANGE_PRIMARY,
} from "../colors";
import { maxWidth, BREAKPOINT_DESKTOP } from "../breakpoints";
import { ROBOTO, POPPINS } from "../typography";

const { scrollToTop } = animateScroll;

const Group = styled.div`
  @media (${maxWidth(BREAKPOINT_DESKTOP)}) {
    display: none;
  }

  width: 235px;
  margin: auto;
  padding: 20px;
  position: sticky;
  top: 0;

  > a {
    display: flex;
    width: 221px;
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

    :hover {
      color: ${HEADLINE_TEXT};
    }

    &.is-active {
      color: ${HEADLINE_TEXT};
      border-left: 1px solid ${ORANGE_PRIMARY};
    }
  }
`;

const Heading = styled.div`
  @media (${maxWidth(BREAKPOINT_DESKTOP)}) {
    display: none;
  }

  height: 16px;
  color: ${GREY_5};
  font-family: ${POPPINS};
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.79px;
  line-height: 17px;
  margin: 0px 0px 7px 1px;
`;

const PageTop = styled.div`
  @media (${maxWidth(BREAKPOINT_DESKTOP)}) {
    display: none;
  }

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

function RightStickyNav({ headings }: { headings: Heading[] }) {
  return (
    <Group>
      <Heading>ON THIS PAGE</Heading>

      {headings.map((h) => (
        <Link
          key={h.key}
          activeClass="is-active"
          className={`tab-${h.level}`}
          to={h.key}
          spy
          smooth
          offset={0}
          duration={500}
        >
          {h.title}
        </Link>
      ))}

      <PageTop onClick={scrollToTop}>Top of Page</PageTop>
    </Group>
  );
}

export default RightStickyNav;
