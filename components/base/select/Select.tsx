import React from "react";
import ReactSelect, { components } from "react-select";
import arrowSelectIcon from "../../../public/images/arrow-select-icon.svg";
import DoubleArrowSelectIcon from "../../../public/images/double-arrows-select-icon";
import CheckMarkIcon from "../../../public/images/check-mark-icon";
import {
  StyledDefaultDropdownIcon,
  StyledOptionWrap,
  StyledSelectedIconWrap,
  defaultCustomStyles,
  codeCustomStyles,
  addAutoWidthStyles,
} from "./Select.styles";

const DefaultDropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <StyledDefaultDropdownIcon
        src={arrowSelectIcon}
        alt=""
        className={props.selectProps.menuIsOpen ? "menuOpen" : ""}
      />
    </components.DropdownIndicator>
  );
};

const CodeDropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <DoubleArrowSelectIcon />
    </components.DropdownIndicator>
  );
};

const Option = (props: any) => {
  return (
    <StyledOptionWrap>
      {props.isSelected && (
        <StyledSelectedIconWrap>
          <CheckMarkIcon />
        </StyledSelectedIconWrap>
      )}
      <components.Option {...props} />
    </StyledOptionWrap>
  );
};

type Props = {
  options: any;
  selectedValue: any;
  setSelectedValue: any;
  autoWidth?: boolean;
  variant?: "default" | "code";
};

const Select = ({
  options,
  selectedValue,
  setSelectedValue,
  autoWidth = false,
  variant = "default",
}: Props) => {
  const customStyles =
    variant === "code" ? codeCustomStyles : defaultCustomStyles;
  const DropdownIndicator =
    variant === "code" ? CodeDropdownIndicator : DefaultDropdownIndicator;

  return (
    <ReactSelect
      value={selectedValue}
      onChange={(selectedOption) => setSelectedValue(selectedOption)}
      options={options}
      styles={autoWidth ? addAutoWidthStyles(customStyles) : customStyles}
      components={{ DropdownIndicator, Option }}
      isSearchable={false}
    />
  );
};

export default Select;
