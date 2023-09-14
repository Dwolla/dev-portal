import React, { useState } from "react";
import { FormControl, styled } from "@mui/material";
import { storiesOf } from "@storybook/react";
import SelectMui, {
  SelectMuiOption,
  SelectMuiProps,
} from "../../app/components/base/SelectMui";
import { PURPLE_DARKER } from "../../app/components/colors";
import { ReactComponent as DwollaConnectColorIcon } from "../../assets/images/product-icons-and-heroes/dwolla-connect-icon-48x48.svg";
import { ReactComponent as DwollaBalanceColorIcon } from "../../assets/images/product-icons-and-heroes/dwolla-balance-icon-48x48.svg";

const PurpleBackground = styled("div", { name: "PurpleBackground" })(() => ({
  alignItems: "center",
  backgroundColor: PURPLE_DARKER,
  bottom: 0,
  display: "flex",
  justifyContent: "center",
  left: 0,
  position: "absolute",
  right: 0,
  top: 0,
}));

const SelectWrapContainer = styled("div", { name: "SelectWrapContainer" })(
  () => ({ width: "250px" })
);

function SelectWrap(wrapOptions?: Partial<SelectMuiProps>) {
  const options: Array<SelectMuiOption> = [
    { value: "javascript", label: "JavaScript" },
    { value: "php", label: "PHP" },
    { value: "ruby", label: "Ruby" },
    { value: "python", label: "Python" },
    { value: "raw", label: "Raw" },
    { value: "connect", label: "Dwolla Connect", icon: DwollaConnectColorIcon },
    { value: "balance", label: "Dwolla Balance", icon: DwollaBalanceColorIcon },
  ];
  const [selectedValue, setSelectedValue] = useState(options[0]);

  return (
    <SelectWrapContainer>
      <FormControl fullWidth>
        <SelectMui
          {...wrapOptions}
          label="Select Language"
          onChange={(value) => setSelectedValue(value)}
          options={options}
          value={selectedValue}
        />
      </FormControl>
    </SelectWrapContainer>
  );
}

storiesOf("base/SelectMui", module)
  .add("default", () => <SelectWrap />)
  .add("purple bg, white border", () => (
    <PurpleBackground>
      <SelectWrap color="white" />
    </PurpleBackground>
  ));
