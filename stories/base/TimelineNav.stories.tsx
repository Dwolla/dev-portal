import * as React from "react";
import { storiesOf } from "@storybook/react";
import TimelineNav from "../../app/components/base/TimelineNav";

storiesOf("base|TimelineNav", module).add("default", () => {
  const [active, setActive] = React.useState(1);
  return (
    <TimelineNav
      totalSteps={["Default step", "1st step", "2nd step", "3rd step"]}
      active={active}
      setActive={setActive}
    />
  );
});
