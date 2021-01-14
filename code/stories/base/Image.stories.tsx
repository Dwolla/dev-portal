import * as React from "react";
import { storiesOf } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import Image from "../../components/base/Image";
import transferTimeline from "../../../assets/images/content-images/test-transfer-timeline-linear.png";

storiesOf("base|Image", module)
  .addDecorator(centered)
  .add("default", () => (
    <Image src={transferTimeline} alt="Linear Transfer Timeline" />
  ));
