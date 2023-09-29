import * as React from "react";
import { storiesOf } from "@storybook/react";
import ProductHeroBanner from "../../app/components/base/ProductHeroBanner";
import { ReactComponent as HeroGraphicBalance } from "../../assets/images/product-icons-and-heroes/dwolla-balance-icon-48x48.svg";
import { ReactComponent as HeroGraphicConnect } from "../../assets/images/product-icons-and-heroes/dwolla-connect-icon-48x48.svg";

storiesOf("base/ProductHeroBanner", module)
  .add("Balance", () => (
    <ProductHeroBanner
      variant="Balance"
      HeroGraphic={HeroGraphicBalance}
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
  ))
  .add("Connection", () => (
    <ProductHeroBanner
      variant="Connect"
      HeroGraphic={HeroGraphicConnect}
      topic="Dwolla Connect"
      description="Use your existing bank partnerships to connect your software to the banking infrastructure."
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
