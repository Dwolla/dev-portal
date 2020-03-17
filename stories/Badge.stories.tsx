import * as React from "react";
import { storiesOf } from "@storybook/react";
import Badge from "../components/Badge";

storiesOf("Badge", module).add("default", () => {
  return <Badge text="BADGETEXT" />;
});
