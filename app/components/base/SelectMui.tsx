import React, { ComponentPropsWithRef, useId } from "react";
import { InputLabel, MenuItem, Select } from "@mui/material";

export interface SelectMuiOption {
  label: string;
  value: SelectMuiValue;
}

interface SelectMuiProps {
  label: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: SelectMuiOption) => MaybePromise<void>;
  options: Array<SelectMuiOption>;
  value: SelectMuiOption | SelectMuiValue;
}

// MUI MenuItem does allow additional properties other than li (the default)...
// If a custom element were to be chosen, though, then this type would also
// need to change to accommodate whether the component allows value(s) as prop
type SelectMuiValue = ComponentPropsWithRef<"li">["value"];

function isOption(
  obj: SelectMuiOption | SelectMuiValue
): obj is SelectMuiOption {
  return typeof obj === "object" && "label" in obj && "value" in obj;
}

export default function SelectMui({
  label,
  onChange,
  options,
  value,
}: SelectMuiProps): JSX.Element {
  const id = useId();

  return (
    <>
      <InputLabel id={id}>{label}</InputLabel>
      <Select<SelectMuiValue>
        label={label}
        labelId={id}
        onChange={({ target: { value: selectedValue } }) => {
          if (onChange) {
            onChange(options.find((obj) => obj.value === selectedValue));
          }
        }}
        value={isOption(value) ? value.value : value}
      >
        {options.map(({ label: itemLabel, value: itemValue }) => (
          <MenuItem key={useId()} value={itemValue}>
            {itemLabel}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
