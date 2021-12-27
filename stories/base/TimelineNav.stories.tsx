import * as React from "react";
import { storiesOf } from "@storybook/react";
import TimelineNav from "../../app/components/base/TimelineNav";

storiesOf("base|TimelineNav", module).add("default", () => (
  <TimelineNav
    totalSteps={["Create Transfer", "First Leg", "Second Leg", "Third Leg"]}
    setActiveStep={2}
  />
));
