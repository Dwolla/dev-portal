import * as React from "react";
import { storiesOf } from "@storybook/react";
import DemoPreviewCard from "../../app/components/base/DemoPreviewCard";
import gif from "../../assets/gifs/coast-demo-plaid.gif";

storiesOf("base/DemoPreviewCard", module)
  .add("Default", () => (
    <DemoPreviewCard
      imageSrc={gif}
      imageAlt="Demo"
      href="https://example.com"
    />
  ))
  .add("All props", () => (
    <DemoPreviewCard
      imageSrc={gif}
      href="https://example.com"
      title="Title"
      description="This is the description"
      buttonText="Demo"
      imageAlt="Image Alt"
      gradientDirection="to bottom right"
    />
  ));
