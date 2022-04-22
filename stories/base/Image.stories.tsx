import * as React from "react";
import { storiesOf } from "@storybook/react";
import Image from "../../app/components/base/Image";
import transferTimeline from "../../assets/images/content-images/test-transfer-timeline-linear.png";

storiesOf("base/Image", module)
  .add("default", () => (
    <Image src={transferTimeline} alt="Linear Transfer Timeline" />
  ))
  .add("with expand", () => (
    <Image src={transferTimeline} alt="Linear Transfer Timeline" expand />
  ));
