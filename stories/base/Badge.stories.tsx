import * as React from "react";
import { storiesOf } from "@storybook/react";
import Badge from "../../app/components/base/Badge";

storiesOf("base/Badge", module)
  .add("default", () => <Badge text="BADGETEXT" />)
  .add("with orange variant", () => <Badge text="3" variant="orange" />)
  .add("with explicit default variant", () => (
    <Badge text="default variation" variant="default" />
  ));
