import * as React from "react";
import styled from "@emotion/styled";
import { storiesOf } from "@storybook/react";
import HeroCard from "../../app/components/base/HeroCard";
import { breakDown } from "../../app/components/breakpoints";

const DivStyle = styled.div`
  padding: 100px;
  @media (${breakDown("xs")}) {
    padding: unset;
  }
`;

storiesOf("base|HeroCard", module)
  .add("default", () => (
    <DivStyle>
      <HeroCard
        topic="Save development time with Drop-in Components"
        description="Integrate with the Dwolla API with just a few lines of code"
      />
    </DivStyle>
  ))
  .add("with button", () => (
    <DivStyle>
      <HeroCard
        topic="Save development time with Drop-in Components"
        description="Integrate with the Dwolla API with just a few lines of code"
        button={{
          text: "View Walkthrough Guide",
          link: {
            href: "https://www.dwolla.com",
            external: false,
          },
        }}
      />
    </DivStyle>
  ))
  .add("with links", () => (
    <DivStyle>
      <HeroCard
        topic="Save development time with Drop-in Components"
        description="Integrate with the Dwolla API with just a few lines of code"
        links={[
          {
            text: "Technical Documentation",
            href: "https://www.dwolla.com",
            external: false,
          },
          {
            text: "Learn about the components",
            href: "https://www.dwolla.com",
            external: true,
          },
        ]}
      />
    </DivStyle>
  ))
  .add("with button + links", () => (
    <DivStyle>
      <HeroCard
        topic="Save development time with Drop-in Components"
        description="Integrate with the Dwolla API with just a few lines of code"
        button={{
          text: "View Walkthrough Guide",
          link: {
            href: "https://www.dwolla.com",
            external: false,
          },
        }}
        links={[
          {
            text: "Technical Documentation",
            href: "https://www.dwolla.com",
            external: false,
          },
          {
            text: "Learn about the components",
            href: "https://www.dwolla.com",
            external: true,
          },
        ]}
      />
    </DivStyle>
  ));
