import React, { type PropsWithChildren } from "react";
import {
  styled,
  SvgIcon,
  type SvgIconProps,
  Tooltip as MuiTooltip,
  tooltipClasses,
  type TooltipProps,
  Typography,
} from "@mui/material";
import { PURPLE_PRIMARY, WHITE_PRIMARY } from "../colors";
import tooltipPresets from "../tooltip-presets";

const WrappedMuiTooltip = styled(({ className, ...props }: TooltipProps) => (
  <MuiTooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "transparent",
  },
}));

const TooltipWrapper = styled("div", { name: "TooltipWrapper" })({
  background: WHITE_PRIMARY,
  border: `1px solid ${PURPLE_PRIMARY}`,
  borderRadius: "0.25rem",
  display: "flex",
  width: "16.5rem",
});

const IconWrapper = styled("div", { name: "IconWrapper" })({
  alignItems: "center",
  alignSelf: "stretch",
  background: PURPLE_PRIMARY,
  display: "flex",
  padding: "0.0625rem 0.5rem",
});

const TextWrapper = styled("div", { name: "TextWrapper" })({
  display: "flex",
  flexDirection: "column",
  gap: "0.625rem",
  padding: "0.5rem",
});

export interface DefaultContentTooltipProps {
  content: string;
  icon?: SvgIconProps["component"];
  title?: string;
}

export interface PresetContentTooltipProps {
  preset: keyof (typeof tooltipPresets)["presets"];
}

export type ContentTooltipProps =
  | DefaultContentTooltipProps
  | PresetContentTooltipProps;

const isPresetTooltip = (obj: any): obj is PresetContentTooltipProps =>
  !!obj.preset;

const getPropsFromPreset = (
  obj: PresetContentTooltipProps
): DefaultContentTooltipProps => ({
  ...tooltipPresets.presets[obj.preset],
});

export default function ContentTooltip({
  children,
  ...initialProps
}: PropsWithChildren<ContentTooltipProps>) {
  const { content, icon, title } = isPresetTooltip(initialProps)
    ? getPropsFromPreset(initialProps)
    : initialProps;

  return (
    <WrappedMuiTooltip
      placement="top"
      title={
        <TooltipWrapper>
          {icon && (
            <IconWrapper>
              <SvgIcon
                component={icon}
                inheritViewBox
                sx={{ color: WHITE_PRIMARY }}
              />
            </IconWrapper>
          )}

          <TextWrapper>
            {title && (
              <Typography variant="subtitle2" sx={{ color: PURPLE_PRIMARY }}>
                {title}
              </Typography>
            )}

            <Typography variant="body2" sx={{ color: PURPLE_PRIMARY }}>
              {content}
            </Typography>
          </TextWrapper>
        </TooltipWrapper>
      }
    >
      <span>{children}</span>
    </WrappedMuiTooltip>
  );
}
