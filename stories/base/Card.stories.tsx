import * as React from "react";
import { storiesOf } from "@storybook/react";
import styled from "@emotion/styled";
import Card from "../../app/components/base/Card";
import guideIcon from "../../assets/images/content-images/content-icons/guides-icon.svg";
import balanceIcon from "../../assets/images/product-icons-and-heroes/dwolla-balance-icon-white-48x48.svg";
import connectIcon from "../../assets/images/content-images/content-icons/dwolla-connect-product-icon.svg";

const CardWrapper = styled.div`
  width: 400px;
`;

storiesOf("base/Card", module)
  .add("default", () => (
    <Card
      topic="This is the Topic"
      description="An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
    />
  ))
  .add("Card with icon", () => (
    <Card
      icon={guideIcon}
      topic="This is the Topic"
      description="An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
    />
  ))
  .add("`links`", () => (
    <Card
      links={[
        {
          text: "Learn more",
          href: "https://www.dwolla.com",
          external: false,
        },
        {
          text: "Learn some more",
          href: "https://www.dwolla.com",
          external: true,
        },
      ]}
      icon={guideIcon}
      topic="This is the Topic"
      description="An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
    />
  ))
  .add("`badge`", () => (
    <Card
      icon={guideIcon}
      badge="BADGETEXT"
      topic="This is the Topic"
      description="An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
    />
  ))
  .add("`link` + `badge`", () => (
    <Card
      links={[
        {
          text: "Learn more",
          href: "https://www.dwolla.com",
          external: true,
        },
      ]}
      icon={guideIcon}
      badge="BADGETEXT"
      topic="This is the Topic"
      description="An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
    />
  ))
  .add("`productName` + `link`", () => (
    <Card
      links={[
        {
          text: "Dwolla Balance",
          href: "https://www.dwolla.com",
          external: false,
        },
      ]}
      icon={balanceIcon}
      product="BALANCE"
      topic="Use our existing bank partnerships"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    />
  ))
  .add("Card with Width wrapper", () => (
    <CardWrapper>
      <Card
        links={[
          {
            text: "Dwolla Balance",
            href: "https://www.dwolla.com",
            external: false,
          },
        ]}
        icon={connectIcon}
        product="CONNECT"
        topic="Use our existing bank partnerships"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </CardWrapper>
  ))
  .add("`horizontalCenterAlign`", () => (
    <Card
      horizontalCenterAlign
      icon={guideIcon}
      topic="This is the Topic for center aligned cards reperesenting CTAs."
      description="This is a short description."
    />
  ))
  .add("`horizontalCenterAlign` + `link`", () => (
    <Card
      horizontalCenterAlign
      links={[
        {
          text: "Learn more",
          href: "https://www.dwolla.com",
          external: true,
        },
      ]}
      icon={guideIcon}
      topic="This is the Topic for center aligned cards reperesenting CTAs."
      description="This is a short description."
    />
  ))
  .add("`horizontalCenterAlign` + `badge`", () => (
    <Card
      horizontalCenterAlign
      icon={guideIcon}
      badge="BADGETEXT"
      topic="This is the Topic for center aligned cards reperesenting CTAs."
      description="This is a short description."
    />
  ))
  .add("`horizontalCenterAlign` + `link` + `badge`", () => (
    <Card
      horizontalCenterAlign
      links={[
        {
          text: "Learn more",
          href: "https://www.dwolla.com",
          external: true,
        },
      ]}
      icon={guideIcon}
      badge="BADGETEXT"
      topic="This is the Topic for center aligned cards reperesenting CTAs."
      description="This is a short description."
    />
  ))
  .add("`isFlex`", () => (
    <Card
      isFlex
      links={[
        {
          text: "Learn more",
          href: "https://www.dwolla.com",
          external: true,
        },
      ]}
      icon={guideIcon}
      topic="This is the Topic."
      description="This is a  description.An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
    />
  ))
  .add("`isFlex` + badge", () => (
    <Card
      isFlex
      icon={guideIcon}
      badge="BADGETEXT"
      topic="This is the Topic."
      description="This is a  description.An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
    />
  ))
  .add("`isFlex` + badge + link", () => (
    <Card
      isFlex
      links={[
        {
          text: "Learn more",
          href: "https://www.dwolla.com",
          external: true,
        },
      ]}
      icon={guideIcon}
      badge="BADGETEXT"
      topic="This is the Topic."
      description="This is a  description.An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
    />
  ))
  .add("with languages", () => (
    <CardWrapper>
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
    </CardWrapper>
  ));
