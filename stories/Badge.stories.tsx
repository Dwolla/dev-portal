import * as React from "react";
import { storiesOf } from "@storybook/react";
import Badge from '../components/Badge.tsx';

storiesOf("Badge", module).add("default", () => {
  return <Badge text={"BADGETEXT"}/>;
});