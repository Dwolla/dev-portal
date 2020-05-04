import React from "react";
import "react-tippy/dist/tippy.css";
import "./Tooltip.styles.css"; // Custom styles to override classes defined in react-tippy component
import { Tooltip as ReactTooltip } from "react-tippy";

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
    <ReactTooltip
      arrow={Arrow}
      position={position}
      distance={Distance}
      html={<div className="tooltip-content">{text}</div>}
    >
      {children}
    </ReactTooltip>
  );
}

export default Tooltip;
