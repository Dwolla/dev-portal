import * as React from "react";
import { storiesOf } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import InlineCTA from "../../components/base/InlineCTA";
import guideIcon from "../../public/images/guides-icon-large.svg";

storiesOf("base|Inline CTA", module)
  .addDecorator(centered)
  .add("Default", () => (
    <InlineCTA
      icon={guideIcon}
      text="To learn more about how to initiate a Same-Day ACH credit transfer, reference our developer resource article."
    />
  ));
