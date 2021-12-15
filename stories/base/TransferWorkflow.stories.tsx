import * as React from "react";
import { storiesOf } from "@storybook/react";
import TransferWorkflow from "../../app/components/base/TransferWorkflow";

storiesOf("base|TransferWorkflow", module).add("default", () => (
  <TransferWorkflow />
));
