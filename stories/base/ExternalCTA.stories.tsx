import * as React from "react";
import { storiesOf } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import ExternalCTA from "../../components/base/ExternalCTA";
import developerCommunityIcon from "../../assets/images/content-icons/developer-community-icon.svg";

storiesOf("base|External CTA", module)
  .addDecorator(centered)
  .add("Default", () => (
    <ExternalCTA
      icon={developerCommunityIcon}
      title="Developer Support"
      description="Interact with the developer community and Dwolla developer support to find answers to your technical questions."
    />
  ))
  .add("No title", () => (
    <ExternalCTA
      icon={developerCommunityIcon}
      description="Interact with the developer community and Dwolla developer support to find answers to your technical questions."
    />
  ));
