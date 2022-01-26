type Breakpoint = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

// <: extra extra small devices - portrait phones
const BREAKPOINT_320 = 321;
// <: extra small devices - portrait phones
const BREAKPOINT_576 = 576;
// > <: small devices - landscape phones
const BREAKPOINT_768 = 768;
// > <: medium devices - tablets
const BREAKPOINT_992 = 992;
// > <: large devices - desktops
const BREAKPOINT_1200 = 1200;
// > <: extra large devices - large desktops, etc.
const BREAKPOINT_1600 = 1600;
// >: extra extra large devices - Big McLargeHuge devices

function breakUpPx(bpt: Breakpoint): number {
  switch (bpt) {
    case "sm":
      return BREAKPOINT_576;
    case "md":
      return BREAKPOINT_768;
    case "lg":
      return BREAKPOINT_992;
    case "xl":
      return BREAKPOINT_1200;
    case "xxl":
      return BREAKPOINT_1600;
    default:
      return 0;
  }
}

function breakDownPx(bpt: Breakpoint): number {
  switch (bpt) {
    case "xxs":
      return BREAKPOINT_320;
    case "xs":
      return BREAKPOINT_576;
    case "sm":
      return BREAKPOINT_768;
    case "md":
      return BREAKPOINT_992;
    case "lg":
      return BREAKPOINT_1200;
    case "xl":
      return BREAKPOINT_1600;
    default:
      return 0;
  }
}

export const breakUp = (bpt: Breakpoint) => `min-width: ${breakUpPx(bpt)}px`;
export const breakDown = (bpt: Breakpoint) =>
  `max-width: ${breakDownPx(bpt) - 0.02}px`;
