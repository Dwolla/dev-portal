import React from "react";
import ReactSelect, { components } from "react-select";
import dropdownArrowSingle from "../../../../assets/images/component-icons/dropdown-arrow-single.svg";
import { ReactComponent as DropdownArrowDouble } from "../../../../assets/images/component-icons/dropdown-arrow-double.svg";
import { ReactComponent as CheckMarkIcon } from "../../../../assets/images/component-icons/check-mark.svg";
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
        src={dropdownArrowSingle}
        alt=""
        className={props.selectProps.menuIsOpen ? "menuOpen" : ""}
      />
    </components.DropdownIndicator>
  );
};

const CodeDropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <DropdownArrowDouble width={7} height={12} />
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
