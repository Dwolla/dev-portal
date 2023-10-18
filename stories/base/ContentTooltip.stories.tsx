import * as React from "react";
import { storiesOf } from "@storybook/react";
import { AcUnit } from "@mui/icons-material";
import ContentTooltip from "../../app/components/base/ContentTooltip";

storiesOf("base/ContentTooltip", module)
  .add("default, no icon, no title", () => (
    <ContentTooltip content="The Dwolla balance is a Funding Source that can be utilized like a “wallet” for holding a stored value of USD funds.">
      a digital wallet
    </ContentTooltip>
  ))
  .add("with icon, no title", () => (
    <ContentTooltip
      content="The Dwolla balance is a Funding Source that can be utilized like a “wallet” for holding a stored value of USD funds."
      icon={AcUnit}
    >
      a digital wallet
    </ContentTooltip>
  ))
  .add("with icon, with title", () => (
    <ContentTooltip
      content="The Dwolla balance is a Funding Source that can be utilized like a “wallet” for holding a stored value of USD funds."
      icon={AcUnit}
      title="The Dwolla Balance"
    >
      a digital wallet
    </ContentTooltip>
  ))
  .add("with icon, with title, with href", () => (
    <ContentTooltip
      content="The Dwolla balance is a Funding Source that can be utilized like a “wallet” for holding a stored value of USD funds."
      icon={AcUnit}
      title="The Dwolla Balance"
      href="https://developers.dwolla.com/docs"
    >
      a digital wallet
    </ContentTooltip>
  ))
  .add("with href, no icon", () => (
    <ContentTooltip
      content="When a custom icon isn't provided, the tooltip will use a default icon"
      href="https://developers.dwolla.com/docs"
    >
      a digital wallet
    </ContentTooltip>
  ))
  .add("with `dwolla-balance` preset", () => (
    <ContentTooltip preset="dwolla-balance">Dwolla Balance</ContentTooltip>
  ));
