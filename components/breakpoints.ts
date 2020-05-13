// <: extra small devices - portrait phones
const BREAKPOINT_1 = 576;
// > <: small devices - landscape phones
const BREAKPOINT_2 = 768;
// > <: medium devices - tablets
const BREAKPOINT_3 = 992;
// > <: large devices - desktops
const BREAKPOINT_4 = 1200;
// > <: extra large devices - large desktops, etc.
const BREAKPOINT_5 = 1600;
// >: extra extra large devices - Big McLargeHuge devices

function breakUpPx(breakpoint) {
  switch (breakpoint) {
    case "sm":
      return BREAKPOINT_1;
    case "md":
      return BREAKPOINT_2;
    case "lg":
      return BREAKPOINT_3;
    case "xl":
      return BREAKPOINT_4;
    case "xxl":
      return BREAKPOINT_5;
    default:
      return breakpoint;
  }
}

function breakDownPx(breakpoint) {
  switch (breakpoint) {
    case "xs":
      return BREAKPOINT_1;
    case "sm":
      return BREAKPOINT_2;
    case "md":
      return BREAKPOINT_3;
    case "lg":
      return BREAKPOINT_4;
    case "xl":
      return BREAKPOINT_5;
    default:
      return breakpoint;
  }
}

export const breakUp = (breakpoint) => `min-width: ${breakUpPx(breakpoint)}px`;
export const breakDown = (breakpoint) =>
  `max-width: ${breakDownPx(breakpoint) - 0.02}px`;
