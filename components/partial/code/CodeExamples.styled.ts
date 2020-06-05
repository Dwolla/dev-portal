import styled from "@emotion/styled";
import {
  PURPLE_DARKER,
  CODE_BLOCK_BUTTON,
  GREY_10,
  WHITE_PRIMARY,
  GREY_5,
  PURPLE_DARK,
  GREY_3,
  CODE_BLOCK_PURPLE,
  CODE_BLOCK_AQUA,
  CODE_BLOCK_ORANGE,
  GREY_4,
  CODE_BLOCK_GREEN_BROWN,
  CODE_BLOCK_GREEN,
  CODE_BLOCK_YELLOW,
} from "../../colors";
import { POPPINS } from "../../typography";

export const CodeBlockBar = styled.div`
  background-color: ${PURPLE_DARKER};
  padding: 7px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  justify-content: flex-end;

  > * {
    margin: 0 5px;
  }
`;

export const CopyButton = styled.button`
  background-color: ${CODE_BLOCK_BUTTON};
  border: none;
  color: ${GREY_10};
  border-radius: 5px;
  font-size: 11px;
  font-family: ${POPPINS};
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
  font-family: ${POPPINS};
  text-transform: uppercase;
  letter-spacing: 0.79px;
  height: 27px;
  display: flex;
  align-items: center;
  padding: 0 5px;
`;

export const CodeBlock = styled.div`
  background-color: ${PURPLE_DARK};
  overflow-x: scroll;
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
          color: ${GREY_5};
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
`;
