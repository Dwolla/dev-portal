import React from "react";
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

interface Props {
  displayText: string;
  tooltip: {
    content: string;
    icon?: SvgIconProps["component"];
    title?: string;
  };
}

export default function ContentTooltip({
  displayText,
  tooltip: { content, icon, title },
}: Props) {
  return (
    <WrappedMuiTooltip
      placement="top"
      title={
        <TooltipWrapper>
          {icon && (
            <IconWrapper>
              <SvgIcon component={icon} sx={{ color: WHITE_PRIMARY }} />
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
      <span>{displayText}</span>
    </WrappedMuiTooltip>
  );
}
