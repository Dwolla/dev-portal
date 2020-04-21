import styled from "@emotion/styled";
import {
  GREY_1,
  GREY_3,
  GREY_4,
  GREY_5,
  GREY_6,
  GREY_10,
  WHITE_PRIMARY,
  CODE_BLOCK_BUTTON,
  CODE_BLOCK_BLACK,
} from "../../colors";
import { BOX_SHADOW_2 } from "../../shadowDepths";
import { POPPINS } from "../../typography";

export const StyledDefaultDropdownIcon = styled.img`
  transform: scaleY(-1);
  width: 9px;
  height: 5px;

  &.menuOpen {
    transform: none;
  }
`;

export const StyledOptionWrap = styled.div`
  position: relative;
`;

export const StyledSelectedIconWrap = styled.div`
  position: absolute;
  display: flex;
  top: calc(50% - 3.5px);
  left: 9px;
  pointer-events: none;
`;

const sharedCustomStyles = {
  valueContainer: (styles) => ({
    ...styles,
    padding: 0,
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    display: "none",
  }),
};

export const defaultCustomStyles = {
  ...sharedCustomStyles,
  control: (styles, { isFocused }) => ({
    ...styles,
    minHeight: "auto",
    boxShadow: "none",
    cursor: "pointer",
    borderRadius: 20,
    backgroundColor: GREY_1,
    borderColor: isFocused ? GREY_4 : GREY_3,
    color: isFocused ? GREY_6 : GREY_5,

    ":hover": {
      borderColor: GREY_4,
      color: GREY_6,
    },
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "inherit",
    fontFamily: POPPINS,
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: 0,
    lineHeight: "20px",
    textTransform: "uppercase",
    position: "relative",
    transform: "none",
    margin: "5px 8px 5px 15px",
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    padding: 0,
    marginRight: 15,
  }),
  menu: (styles) => ({
    ...styles,
    borderRadius: 5,
    width: "auto",
    minWidth: "100%",
    boxShadow: BOX_SHADOW_2,
  }),
  menuList: (styles) => ({
    ...styles,
    padding: 0,
    borderRadius: 5,
    border: `1px solid ${GREY_10}`,
  }),
  option: (styles, { isFocused }) => ({
    ...styles,
    fontFamily: POPPINS,
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: 0,
    lineHeight: "20px",
    textTransform: "uppercase",
    cursor: "pointer",
    backgroundColor: isFocused ? GREY_1 : WHITE_PRIMARY,
    color: isFocused ? GREY_6 : GREY_5,
    padding: "5px 17px 5px 28px",

    ":active": {
      backgroundColor: GREY_1,
    },
  }),
};

export const codeCustomStyles = {
  ...sharedCustomStyles,
  control: (styles, { isFocused }) => ({
    ...styles,
    minHeight: "auto",
    boxShadow: "none",
    cursor: "pointer",
    borderRadius: 5,
    backgroundColor: CODE_BLOCK_BUTTON,
    borderColor: isFocused ? WHITE_PRIMARY : GREY_10,
    color: isFocused ? WHITE_PRIMARY : GREY_10,

    svg: {
      g: {
        fill: isFocused ? WHITE_PRIMARY : GREY_10,
      },
    },

    ":hover": {
      borderColor: WHITE_PRIMARY,
      color: WHITE_PRIMARY,

      svg: {
        g: {
          fill: WHITE_PRIMARY,
        },
      },
    },
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "inherit",
    fontFamily: POPPINS,
    fontSize: 11,
    letterSpacing: 0.79,
    lineHeight: "17px",
    textTransform: "uppercase",
    position: "relative",
    transform: "none",
    margin: "4px 8px",
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    padding: 0,
    marginRight: 8,
  }),
  menu: (styles) => ({
    ...styles,
    borderRadius: 5,
    width: "auto",
    minWidth: "100%",
  }),
  menuList: (styles) => ({
    ...styles,
    padding: 0,
    borderRadius: 5,
    border: `1px solid ${GREY_10}`,

    svg: {
      path: {
        stroke: WHITE_PRIMARY,
      },
    },
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    fontFamily: POPPINS,
    fontSize: 11,
    letterSpacing: 0.79,
    lineHeight: "17px",
    textTransform: "uppercase",
    cursor: "pointer",
    backgroundColor:
      isFocused || isSelected ? CODE_BLOCK_BLACK : CODE_BLOCK_BUTTON,
    color: isFocused || isSelected ? WHITE_PRIMARY : GREY_10,
    padding: "3px 24px",

    ":active": {
      backgroundColor: CODE_BLOCK_BLACK,
    },
  }),
};

export const addAutoWidthStyles = (normalStyles) => ({
  ...normalStyles,
  container: (styles) => ({
    ...styles,
    display: "inline-block",
  }),
});
