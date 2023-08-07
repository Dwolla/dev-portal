import * as React from "react";
import { storiesOf } from "@storybook/react";
import ProductHeroBanner from "../../app/components/base/ProductHeroBanner";
import { ReactComponent as HeroGraphic } from "../../assets/images/product-icons-and-heroes/dwolla-balance_icon_48x48.svg";

storiesOf("base/ProductHeroBanner", module).add("default", () => (
  <ProductHeroBanner
    HeroGraphic={HeroGraphic}
    topic="Dwolla Balance"
    description="Use Dwolla’s existing bank partnerships to connect your software to the banking infrastructure."
    links={[
      {
        text: "API reference",
        href: "/api-reference",
      },
      {
        text: "Code Samples",
        href: "/code-samples",
      },
      {
        text: "SDKs",
        href: "/sdks-tools",
      },
    ]}
  />
));
