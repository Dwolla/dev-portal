import * as React from "react";
import { storiesOf } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import FundsFlowSelector from "../../app/components/base/FundsFlowSelector";

storiesOf("base|FundsFlowSelector", module)
  .addDecorator(centered)
  .add("default", () => <FundsFlowSelector />);
