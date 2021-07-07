import * as React from "react";
import styled from "@emotion/styled";
import { storiesOf } from "@storybook/react";
import HeroImage from "../../app/components/base/HeroImage";
import { breakDown } from "../../app/components/breakpoints";
import hero from "../../assets/images/content-images/hero-image-drop-ins.png";

const DivStyle = styled.div`
  padding: 100px;
  @media (${breakDown("xs")}) {
    padding: unset;
  }
`;

storiesOf("base|HeroImage", module).add("default", () => (
  <DivStyle>
    <HeroImage
      heroImage={{
        src: hero,
        alt: "Some alt text",
      }}
    />
  </DivStyle>
));
