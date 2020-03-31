import * as React from "react";
import { storiesOf } from "@storybook/react";
import Badge from "../../components/base/Badge";

storiesOf("base|Badge", module).add("default", () => (
  <Badge text="BADGETEXT" />
));
