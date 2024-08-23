import * as React from "react";
import styled from "@emotion/styled";
import { storiesOf } from "@storybook/react";
import { breakDown } from "../../app/components/breakpoints";
import hero from "../../assets/images/content-images/hero-image-home.svg";
import HeroBanner from "../../app/components/base/HeroBanner";

const DivStyle = styled.div`
  width: 1500px;
  padding: 100px;
  @media (${breakDown("xs")}) {
    padding: unset;
  }
`;

storiesOf("base/HeroBanner", module).add("default", () => (
  <DivStyle>
    <HeroBanner
      heroImage={{
        src: hero,
        alt: "Some alt text",
      }}
      topic="Build with Dwolla"
      description="Documentation, tools and resources for developers to integrate Dwolla's account-to-account payments Platform."
    />
  </DivStyle>
));
