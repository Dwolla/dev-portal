import * as React from "react";
import { storiesOf } from "@storybook/react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ContentTooltip from "../../app/components/base/ContentTooltip";

storiesOf("base/ContentTooltip", module)
  .add("default", () => (
    <ContentTooltip
      displayText="a digital wallet"
      tooltip={{
        content:
          "The Dwolla balance is a Funding Source that can be utilized like a “wallet” for holding a stored value of USD funds.",
      }}
    />
  ))
  .add("with icon, without title", () => (
    <ContentTooltip
      displayText="testing transfers"
      tooltip={{
        content:
          "The Sandbox environment does not replicate any bank transfer processes, so a pending...",
        icon: OpenInNewIcon,
      }}
    />
  ))
  .add("with icon, with title", () => (
    <ContentTooltip
      displayText="testing transfers"
      tooltip={{
        content:
          "The Sandbox environment does not replicate any bank transfer processes, so a pending...",
        icon: OpenInNewIcon,
        title: "Testing Transfers",
      }}
    />
  ));
