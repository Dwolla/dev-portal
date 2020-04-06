import React from "react";
import { storiesOf } from "@storybook/react";
import TopBar from "../../components/layout/TopBar";

storiesOf("layout|TopBar", module)
  .add("default", () => (
    <TopBar
      button={{ text: "Get API Keys" }}
      links={[
        { text: "API Docs", href: "https://docs.dwolla.com", external: true },
        { text: "Changelog", href: "/changelog" },
      ]}
    />
  ))
  .add("active link", () => (
    <TopBar
      button={{ text: "Get API Keys" }}
      links={[
        { text: "API Docs", href: "https://docs.dwolla.com", external: true },
        { text: "Changelog", href: "/changelog", active: true },
      ]}
    />
  ));
