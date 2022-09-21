import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import classnames from "classnames";
import {
  GREY_2,
  GREY_6,
  GREY_1,
  PURPLE_PRIMARY,
  WHITE_PRIMARY,
  VERTICAL_GRADIENT,
} from "../colors";
import { ROBOTO } from "../typography";
import { useAnchors, scrollTo } from "../util/Anchors";
import { TOP_BAR_HEIGHT } from "./TopBar";
import { breakDown } from "../breakpoints";

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
  overflow-y: auto;

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
    color: ${PURPLE_PRIMARY};
    font-family: ${ROBOTO};
    font-size: 13px;
    line-height: 19px;
    text-decoration: none;
    box-sizing: border-box;
    border-left: 1px solid ${GREY_2};
    cursor: pointer;
    transition: border-color 200ms ease;

    :hover {
      color: ${GREY_6};
    }

    :focus {
      outline: none;
      color: ${GREY_6};
      background-color: ${GREY_1};
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
      color: ${PURPLE_PRIMARY};
      background: linear-gradient(${WHITE_PRIMARY}, ${WHITE_PRIMARY})
          padding-box,
        linear-gradient(${VERTICAL_GRADIENT}) border-box;
      border-left: 1px solid transparent;
    }
  }
`;

const Heading = styled.div`
  height: 16px;
  color: ${PURPLE_PRIMARY};
  font-family: ${ROBOTO};
  font-size: 11px;
  font-weight: 500;
  line-height: 17px;
  margin: 0px 0px 7px 1px;
`;

const PageTop = styled.div`
  color: ${PURPLE_PRIMARY};
  font-family: ${ROBOTO};
  font-size: 13px;
  line-height: 19px;
  padding-top: 10px;
  cursor: pointer;

  :hover {
    color: ${GREY_6};
  }
`;

function OnThisPage({
  topOfPageOffset = TOP_BAR_HEIGHT,
}: {
  topOfPageOffset?: number;
}) {
  const ua = useAnchors();
  const { anchors } = ua;

  if (anchors.length === 0) return null;

  return (
    <Container topOfPageOffset={topOfPageOffset}>
      <Heading>ON THIS PAGE</Heading>

      {anchors.map((a) => (
        <Link href={`#${a.id}`} key={a.id}>
          <a
            className={classnames(`tab-${a.level}`, {
              "is-active": ua.activeAnchor?.id === a.id,
            })}
            onClick={() => scrollTo(a.id)}
            onKeyPress={() => scrollTo(a.id)}
            role="link"
            tabIndex={0}
          >
            {a.text}
          </a>
        </Link>
      ))}

      <PageTop onClick={() => scrollTo(anchors[0].id)}>Top of Page</PageTop>
    </Container>
  );
}

export default OnThisPage;
