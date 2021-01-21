import React from "react";
import { css, Global } from "@emotion/core";
import { Tooltip as ReactTooltip } from "react-tippy";
import { WHITE_PRIMARY, GREY_8 } from "../colors";
import { ROBOTO } from "../typography";

type Props = {
  children: any;
  text: string;
  hasArrow?: boolean;
  position: "top" | "bottom" | "left" | "right";
  distance?: number;
};

function Tooltip({ children, text, hasArrow, position, distance }: Props) {
  const Arrow = hasArrow || false;
  const Distance = distance || 10;
  return (
    <>
      <Global
        styles={css`
          /* Custom class for styling Tooltip content */
          .tooltip-content {
            color: ${WHITE_PRIMARY};
            font-family: ${ROBOTO};
            font-size: 12px;
            line-height: 16px;
            text-align: center;
            border-radius: 3px;
          }

          /* Overriding classes from react-tippy component to style Tooltip container */
          .tippy-tooltip {
            border-radius: 3px;
            background-color: ${GREY_8};
          }

          .tippy-popper[x-placement^="top"] [x-arrow] {
            border-top-color: ${GREY_8};
          }
          .tippy-popper[x-placement^="bottom"] [x-arrow] {
            border-bottom-color: ${GREY_8};
          }
          .tippy-popper[x-placement^="right"] [x-arrow] {
            border-right-color: ${GREY_8};
          }
          .tippy-popper[x-placement^="left"] [x-arrow] {
            border-left-color: ${GREY_8};
          }
        `}
      ></Global>
      <ReactTooltip
        arrow={Arrow}
        position={position}
        distance={Distance}
        html={<div className="tooltip-content">{text}</div>}
      >
        {children}
      </ReactTooltip>
    </>
  );
}

export default Tooltip;
