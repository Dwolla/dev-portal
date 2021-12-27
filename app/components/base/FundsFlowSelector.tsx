import React from "react";
import styled from "@emotion/styled";
import Select, { components } from "react-select";
import dropdownArrowSingle from "../../../assets/images/component-icons/dropdown-arrow-single.svg";
import { ReactComponent as CheckMarkIcon } from "../../../assets/images/component-icons/check-mark.svg";
import {
  HEADLINE_TEXT,
  PARAGRAPH_TEXT,
  WHITE_PRIMARY,
  GREY_1,
  GREY_3,
  GREY_4,
  GREY_6,
  GREY_12,
} from "../colors";
import { POPPINS, ROBOTO } from "../typography";
import { breakDown } from "../breakpoints";
import {
  StyledDefaultDropdownIcon,
  StyledOptionWrap,
  StyledSelectedIconWrap,
} from "./select/Select.styles";

const StyledContainer = styled.div`
  width: 330px;
  @media (${breakDown("xxs")}) {
    width: 280px;
  }
`;

const StyledTitle = styled.div`
  height: 33px;
  font-family: ${POPPINS};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  letter-spacing: 0.02em;
  color: ${HEADLINE_TEXT};
`;

const StyledType = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 13px;
  padding: 16px 10px;
  color: ${PARAGRAPH_TEXT};
`;

const sharedTextStyles = {
  fontFamily: ROBOTO,
  fontStyle: "normal",
  fontWeight: "normal",
  padding: "auto 8px",
  fontSize: 14,
  color: `${PARAGRAPH_TEXT}`,
};

const customStyles = {
  control: (styles) => ({
    ...styles,
    border: "unset",
    borderBottom: `1px solid ${GREY_3}`,
    borderRadius: 0,
    boxShadow: "none",
    cursor: "pointer",
    marginBottom: 29,

    ":focus, :hover": {
      borderColor: GREY_4,
      color: GREY_6,
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  input: () => ({
    color: "transparent",
  }),
  placeholder: () => ({
    ...sharedTextStyles,
  }),
  singleValue: (styles) => ({
    ...styles,
    ...sharedTextStyles,
  }),
  menu: (styles) => ({
    ...styles,
    ...sharedTextStyles,
  }),
  menuList: (styles) => ({
    ...styles,
    padding: "unset",
    borderRadius: "inherit",
  }),
  option: (styles, { isFocused }) => ({
    ...styles,
    paddingLeft: 25,
    backgroundColor: isFocused ? GREY_1 : WHITE_PRIMARY,
    color: isFocused ? GREY_6 : GREY_12,

    ":active": {
      backgroundColor: GREY_1,
    },
  }),
};

const senderTypeOptions = [
  { value: "account", label: "Account" },
  { value: "vcr", label: "Verified Customer" },
  { value: "cr", label: "Unverified Customer" },
];

const senderSourceOptions = [
  { value: "balance", label: "Balance" },
  { value: "bank", label: "Bank" },
  { value: "r01", label: "R01-Bank" },
];

const receiverTypeOptions = [
  { value: "account", label: "Account" },
  { value: "vcr", label: "Verified Customer" },
  { value: "cr", label: "Unverified Customer" },
  { value: "ro", label: "Receive-Only User" },
];

const receiverDestinationOptions = [
  { value: "balance", label: "Balance" },
  { value: "bank", label: "Bank" },
  { value: "r03", label: "R03-Bank" },
  { value: "card", label: "Debit Card" },
];

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <StyledDefaultDropdownIcon
        src={dropdownArrowSingle}
        alt=""
        className={props.selectProps.menuIsOpen ? "menuOpen" : ""}
      />
    </components.DropdownIndicator>
  );
};

const Option = (props: any) => {
  return (
    <StyledOptionWrap>
      {props.isSelected && (
        <StyledSelectedIconWrap>
          <CheckMarkIcon stroke="#52627B" width={10} />
        </StyledSelectedIconWrap>
      )}
      <components.Option {...props} />
    </StyledOptionWrap>
  );
};

function FundsFlowSelector() {
  return (
    <StyledContainer>
      <StyledTitle>Sender:</StyledTitle>
      <StyledType>Sender Type</StyledType>
      <Select
        styles={customStyles}
        options={senderTypeOptions}
        components={{ DropdownIndicator, Option }}
        placeholder="Select Sender Type"
      />
      <StyledType>Sender Source</StyledType>
      <Select
        styles={customStyles}
        options={senderSourceOptions}
        components={{ DropdownIndicator, Option }}
        placeholder="Select Sender Source"
      />
      <StyledTitle>Receiver:</StyledTitle>
      <StyledType>Receiver Type</StyledType>
      <Select
        styles={customStyles}
        options={receiverTypeOptions}
        components={{ DropdownIndicator, Option }}
        placeholder="Select Receiver Type"
      />
      <StyledType>Receiver Destination</StyledType>
      <Select
        styles={customStyles}
        options={receiverDestinationOptions}
        components={{ DropdownIndicator, Option }}
        placeholder="Select Receiver Destination"
      />
    </StyledContainer>
  );
}

export default FundsFlowSelector;
