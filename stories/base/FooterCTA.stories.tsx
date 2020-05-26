import * as React from "react";
import { storiesOf } from "@storybook/react";
import FooterCTA from "../../components/base/FooterCTA";

storiesOf("base|FooterCTA", module).add("default", () => (
  <FooterCTA
    topic="Test in the Sandbox for free today."
    description="Use sandbox environment to test API requests."
    button={{
      text: "Get a Sandbox Account",
      link: {
        href: "https://accounts-sandbox.dwolla.com/sign-up",
        external: true,
      },
    }}
  />
));
