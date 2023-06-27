import * as React from "react";
import { storiesOf } from "@storybook/react";
import FooterCTA from "../../app/components/base/FooterCTA";

storiesOf("base/FooterCTA", module).add("default", () => (
  <FooterCTA
    topic="Start Testing in the Dwolla Sandbox"
    description="Use sandbox environment to test API requests."
    button={{
      text: "Start building",
      link: {
        href: "#",
        external: true,
      },
    }}
  />
));
