import React, { ComponentPropsWithRef, useId } from "react";
import { InputLabel, MenuItem, Select, SxProps } from "@mui/material";

/**
 * Defines a `<select>` option that was chosen, returning both its label and value.
 */
export interface SelectMuiOption {
  label: string;
  value: SelectMuiValue;
}

/**
 * Defines all properties that can be specified with the {@link SelectMui} component.
 */
export interface SelectMuiProps {
  color?: SelectMuiColor;
  label: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: SelectMuiOption) => MaybePromise<void>;
  options: Array<SelectMuiOption>;
  value: SelectMuiOption | SelectMuiValue;
}

/**
 * Defines all acceptable color values. If a new color is added to this type definition,
 * it must have a mapping associated with it in the {@link colorMap} variable below.
 */
type SelectMuiColor = "white";

/**
 * Defines the indexed type from {@link SelectMuiColor} to all its respective hex values.
 */
type SelectMuiColorMap = {
  // eslint-disable-next-line no-unused-vars
  [_ in SelectMuiColor]: { color: string; focusedColor: string };
};

/**
 * Defines the value that is passed to the embedded MUI {@link Select} component. Defaults to
 * any value that React will accept for an `<li>` element.
 */
type SelectMuiValue = ComponentPropsWithRef<"li">["value"];

/**
 * Map all {@link SelectMuiColor}s to their respective CSS HEX values.
 */
const colorMap: SelectMuiColorMap = {
  white: {
    color: "#FFFFFF",
    focusedColor: "#0288D1",
  },
};

/**
 * Get the MUI {@link SxProps} modifications that are displayed with the {@link InputLabel}
 * component.
 *
 * This includes the text color, both in a default and in a focused state.
 */
function getInputColor(color?: SelectMuiColor): SxProps | undefined {
  const { color: muiColor, focusedColor: muiFocusedColor } = colorMap[color];

  return (
    muiColor &&
    muiFocusedColor && {
      color: muiColor,
      "&.Mui-focused": { color: muiFocusedColor },
    }
  );
}

/**
 * Get the MUI {@link SxProps} modifications that are displayed with the {@link Select} component.
 *
 * This includes the border color (both in a default or focused state), the hover border color and
 * thickness, and the color of both the text and the embedded svg element.
 */
function getSelectColor(color?: SelectMuiColor): SxProps | undefined {
  const { color: muiColor, focusedColor: muiFocusedColor } = colorMap[color];

  return (
    muiColor &&
    muiFocusedColor && {
      color: muiColor,
      "&.MuiOutlinedInput-root": {
        "& fieldset": { borderColor: muiColor },
        "&.Mui-focused fieldset": { borderColor: muiFocusedColor },
        "&:hover fieldset": { borderColor: muiColor, borderWidth: "0.2rem" },
        "& svg": { color },
      },
    }
  );
}

/**
 * Given a value (which can be of type {@link SelectMuiOption} or {@link SelectMuiValue}),
 * get if it is of type {@link SelectMuiOption}.
 */
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
      <InputLabel id={id} sx={getInputColor(color)}>
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
        sx={getSelectColor(color)}
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
