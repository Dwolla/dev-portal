import styled from "@emotion/styled";
import {
  PURPLE_DARKER,
  CODE_BLOCK_BUTTON,
  GREY_10,
  WHITE_PRIMARY,
  PURPLE_DARK,
  GREY_3,
  CODE_BLOCK_PURPLE,
  CODE_BLOCK_AQUA,
  CODE_BLOCK_ORANGE,
  GREY_4,
  CODE_BLOCK_GREEN_BROWN,
  CODE_BLOCK_GREEN,
  CODE_BLOCK_YELLOW,
  CODE_BLOCK_GREY_COMMENT,
  BLACK_OVERLAY,
} from "../../colors";
import { ROBOTO } from "../../typography";
import { fadeIn, fadeOut, slideIn, slideOut } from "../../keyframes";
import { breakDown } from "../../breakpoints";

export const ExpandedOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  background-color: ${BLACK_OVERLAY};
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 300ms ease-out;

  &.collapsing {
    animation: ${fadeOut} 300ms ease-out;
  }
`;

export const ExpandedCodeBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
  animation: ${slideIn} 300ms ease-out;
  margin: 75px;

  @media (${breakDown("lg")}) {
    margin: 45px;
  }

  @media (${breakDown("md")}) {
    margin: 30px;
  }

  @media (${breakDown("sm")}) {
    margin: 0;
  }

  &.collapsing {
    animation: ${slideOut} 300ms ease-out;
  }
`;

export const CodeBlockBar = styled.div`
  background-color: ${PURPLE_DARKER};
  padding: 7px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;

  > * {
    margin: 0 5px;
  }

  &.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &.code-block-bar-fullscreen {
    @media (${breakDown("sm")}) {
      border-radius: 0;
    }
  }
`;

export const BarTitle = styled.div`
  font-family: ${ROBOTO};
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 17px;
  color: ${GREY_10};
  margin: 0 5px;
  text-transform: uppercase;
`;

export const BarItems = styled.div`
  display: flex;
  justify-content: flex-end;

  > * {
    margin: 0 5px !important;
  }
`;

export const CodeBlockButton = styled.button`
  background-color: ${CODE_BLOCK_BUTTON};
  border: none;
  color: ${GREY_10};
  border-radius: 5px;
  font-size: 11px;
  font-family: ${ROBOTO};
  text-transform: uppercase;
  letter-spacing: 0.79px;
  height: 27px;
  display: inline-flex;
  align-items: center;

  > svg {
    margin-left: 8px;
  }

  &:hover:not(:disabled) {
    cursor: pointer;
    border-color: ${WHITE_PRIMARY};
    color: ${WHITE_PRIMARY};
  }
`;

export const BarText = styled.div`
  color: ${GREY_4};
  font-size: 11px;
  font-family: ${ROBOTO};
  text-transform: uppercase;
  letter-spacing: 0.79px;
  height: 27px;
  display: flex;
  align-items: center;
  padding: 0 5px;
`;

export const CodeBlockContent = styled.div`
  background-color: ${PURPLE_DARK};
  overflow-x: auto;
  flex-grow: 1;
  padding: 12px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  > pre {
    margin: 0;

    > code {
      color: ${GREY_3};

      .hljs- {
        &keyword {
          color: ${CODE_BLOCK_PURPLE};
        }
        &string {
          color: ${CODE_BLOCK_AQUA};
        }
        &meta,
        &comment {
          color: ${CODE_BLOCK_GREY_COMMENT};
        }
        &symbol {
          color: ${CODE_BLOCK_ORANGE};
        }
        &name {
          color: ${CODE_BLOCK_GREEN};
        }
        &tag {
          color: ${CODE_BLOCK_GREEN_BROWN};
        }
        &attr {
          color: ${CODE_BLOCK_YELLOW};
        }
      }
    }
  }

  &.code-block-fullscreen {
    @media (${breakDown("sm")}) {
      border-radius: 0;
    }
  }
`;
