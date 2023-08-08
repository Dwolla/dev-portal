import * as React from "react";
import styled from "@emotion/styled";
import { storiesOf } from "@storybook/react";
import Card from "../../app/components/base/Card";
import CardGrid from "../../app/components/base/CardGrid";
import guideIcon from "../../assets/images/content-images/content-icons/guides-icon.svg";
import productIcon from "../../assets/images/product-icons-and-heroes/dwolla-balance-icon-white-48x48.svg";

const Container = styled.div`
  padding: 30px;
`;

storiesOf("base/CardGrid", module).add("default", () => (
  <Container>
    <CardGrid variant="default">
      <Card
        links={[
          {
            text: "Dwolla Balance",
            href: "https://www.dwolla.com",
            external: false,
          },
        ]}
        icon={productIcon}
        product="BALANCE"
        topic="Use our existing bank partnerships"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
      <Card
        links={[
          {
            text: "GitHub Repository",
            href: "https://www.dwolla.com",
            external: true,
          },
        ]}
        topic="Dwolla Transaction Reports"
        description="An example app that allows clients to get transactions for a specific customer."
        languages={["JavaScript", "Python", "HTML", "CSS"]}
      />
      <Card
        links={[
          {
            text: "Customer types",
            href: "https://www.dwolla.com",
            external: false,
          },
          {
            text: "Create a verified customer",
            href: "https://www.dwolla.com",
            external: false,
          },
          {
            text: "another link for good measure",
            href: "https://www.dwolla.com",
            external: false,
          },
        ]}
        icon={guideIcon}
        topic="Use our existing bank partnerships"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
      <Card
        links={[
          {
            text: "Customer types",
            href: "https://www.dwolla.com",
            external: false,
          },
        ]}
        icon={guideIcon}
        topic="This is the Topic"
        description="An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
      />
      <Card
        icon={guideIcon}
        topic="This is the Topic"
        description="An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
      />
      <Card
        icon={guideIcon}
        topic="This is the Topic"
        description="An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
      />
      <Card
        icon={guideIcon}
        topic="This is the Topic"
        description="An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
      />
      <Card
        icon={guideIcon}
        topic="This is the Topic"
        description="An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
      />
    </CardGrid>
  </Container>
));
