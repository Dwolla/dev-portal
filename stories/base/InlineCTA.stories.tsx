import * as React from "react";
import { storiesOf } from "@storybook/react";
import InlineCTA from "../../app/components/base/InlineCTA";
import guideIcon from "../../assets/images/content-images/content-icons/guides-icon.svg";
import conceptIcon from "../../assets/images/content-images/content-icons/concepts-icon.svg";

storiesOf("base/Inline CTA", module).add("Default", () => (
  <>
    <InlineCTA
      icon={conceptIcon}
      text="To learn more about how to initiate a Same-Day ACH credit transfer, reference our developer concept article."
      href="https://developers.dwolla.com/concepts/same-day-ach"
    />
    <br />
    <InlineCTA
      icon={guideIcon}
      text="For more information on creating a Verified Personal Customer, reference our step by step guide."
      href="https://developers.dwolla.com/guides/personal-verified-customer"
    />
  </>
));
