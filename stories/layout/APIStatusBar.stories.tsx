import { storiesOf } from "@storybook/react";
import APIStatusBar from "../../app/components/layout/APIStatusBar";

storiesOf("layout/APIStatusBar", module)
  .add("indicator = none", () => (
    <APIStatusBar
      apiStatus={{
        indicator: "none",
        description: "It's all good",
      }}
    />
  ))
  .add("indicator = critical", () => (
    <APIStatusBar
      apiStatus={{
        indicator: "critical",
        description: "There's been a critical incident",
      }}
    />
  ))
  .add("indicator = major", () => (
    <APIStatusBar
      apiStatus={{
        indicator: "major",
        description: "There's been a major incident",
      }}
    />
  ))
  .add("indicator = minor", () => (
    <APIStatusBar
      apiStatus={{
        indicator: "minor",
        description: "There's been a minor incident",
      }}
    />
  ))
  .add("indicator = maintenance", () => (
    <APIStatusBar
      apiStatus={{
        indicator: "maintenance",
        description: "Nothing to see here",
      }}
    />
  ));
