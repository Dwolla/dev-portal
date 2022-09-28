import React, { ComponentPropsWithRef, useId } from "react";
import { InputLabel, MenuItem, Select, SxProps } from "@mui/material";

export interface SelectMuiOption {
  label: string;
  value: SelectMuiValue;
}

export interface SelectMuiProps {
  color?: string;
  label: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: SelectMuiOption) => MaybePromise<void>;
  options: Array<SelectMuiOption>;
  value: SelectMuiOption | SelectMuiValue;
}

type SelectMuiValue = ComponentPropsWithRef<"li">["value"];

function getColor(color?: string): SxProps | undefined {
  return color
    ? {
        color,
        "&.MuiOutlinedInput-root": {
          "& fieldset": { borderColor: color },
          "&:hover fieldset": { borderColor: color, borderWidth: "0.15rem" },
          "& svg": { color },
        },
      }
    : undefined;
}

function isOption(
  obj: SelectMuiOption | SelectMuiValue
): obj is SelectMuiOption {
  return typeof obj === "object" && "label" in obj && "value" in obj;
}

export default function SelectMui({
  color,
  label,
  onChange,
  options,
  value,
}: SelectMuiProps): JSX.Element {
  const id = useId();

  return (
    <>
      <InputLabel id={id} sx={getColor(color)}>
        {label}
      </InputLabel>
      <Select<SelectMuiValue>
        label={label}
        labelId={id}
        onChange={({ target: { value: selectedValue } }) => {
          if (onChange) {
            onChange(options.find((obj) => obj.value === selectedValue));
          }
        }}
        sx={getColor(color)}
        value={isOption(value) ? value.value : value}
        variant="outlined"
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
