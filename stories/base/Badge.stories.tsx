import * as React from "react";
import { storiesOf } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import Badge from "../../components/base/Badge";

storiesOf("base|Badge", module)
  .addDecorator(centered)
  .add("default", () => <Badge text="BADGETEXT" />);
