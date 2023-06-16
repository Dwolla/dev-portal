import * as React from "react";
import { storiesOf } from "@storybook/react";
import Help from "../../app/components/base/Help";

const links = [
  { text: "Link one", href: "#" },
  { text: "Link two", href: "#" },
  { text: "Link three", href: "#" },
  { text: "Link four", href: "#" },
];

storiesOf("base/Help", module).add("default", () => <Help links={links} />);
