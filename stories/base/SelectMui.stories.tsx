import React, { useState } from "react";
import { FormControl, styled } from "@mui/material";
import { storiesOf } from "@storybook/react";
import SelectMui, {
  SelectMuiOption,
} from "../../app/components/base/SelectMui";

const SelectWrapContainer = styled("div", { name: "SelectWrapContainer" })(
  () => ({
    width: "150px",
  })
);

function SelectWrap() {
  const options: Array<SelectMuiOption> = [
    { value: "javascript", label: "JavaScript" },
    { value: "php", label: "PHP" },
    { value: "ruby", label: "Ruby" },
    { value: "python", label: "Python" },
    { value: "raw", label: "Raw" },
  ];
  const [selectedValue, setSelectedValue] = useState(options[0]);

  return (
    <SelectWrapContainer>
      <FormControl fullWidth>
        <SelectMui
          label="Select Language"
          onChange={(value) => setSelectedValue(value)}
          options={options}
          value={selectedValue}
        />
      </FormControl>
    </SelectWrapContainer>
  );
}

storiesOf("base/SelectMui", module).add("default", () => <SelectWrap />);
