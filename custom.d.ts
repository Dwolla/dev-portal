declare module "*.svg" {
  import React = require("react"); // eslint-disable-line no-unused-vars
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
