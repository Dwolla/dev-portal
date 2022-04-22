import * as React from "react";
import { storiesOf } from "@storybook/react";
import styled from "@emotion/styled";
import Card from "../../app/components/base/Card";
import guideIcon from "../../assets/images/content-images/content-icons/guides-icon.svg";

const CardWrapper = styled.div`
  width: 300px;
`;

storiesOf("base/Card", module)
  .add("default", () => (
    <Card
      icon={guideIcon}
      topic="This is the Topic"
      description="An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
    />
  ))
  .add("Card with Width wrapper", () => (
    <CardWrapper>
      <Card
        icon={guideIcon}
        topic="This is the Topic"
        description="An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
      />
    </CardWrapper>
  ))
  .add("`link`", () => (
    <Card
      link={{ href: "https://www.dwolla.com", external: true }}
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
  .add("`link` and `badge`", () => (
    <Card
      link={{ href: "https://www.dwolla.com", external: true }}
      icon={guideIcon}
      badge="BADGETEXT"
      topic="This is the Topic"
      description="An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
    />
  ))
  .add("`centerAlign`", () => (
    <Card
      centerAlign
      icon={guideIcon}
      topic="This is the Topic for center aligned cards reperesenting CTAs."
      description="This is a short description."
    />
  ))
  .add("`centerAlign` + `link`", () => (
    <Card
      centerAlign
      link={{ href: "https://www.dwolla.com", external: true }}
      icon={guideIcon}
      topic="This is the Topic for center aligned cards reperesenting CTAs."
      description="This is a short description."
    />
  ))
  .add("`centerAlign` + `badge`", () => (
    <Card
      centerAlign
      icon={guideIcon}
      badge="BADGETEXT"
      topic="This is the Topic for center aligned cards reperesenting CTAs."
      description="This is a short description."
    />
  ))
  .add("`centerAlign` + `link` + `badge`", () => (
    <Card
      centerAlign
      link={{ href: "https://www.dwolla.com", external: true }}
      icon={guideIcon}
      badge="BADGETEXT"
      topic="This is the Topic for center aligned cards reperesenting CTAs."
      description="This is a short description."
    />
  ))
  .add("`isFlex`", () => (
    <Card
      isFlex
      link={{ href: "https://www.dwolla.com", external: true }}
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
      link={{ href: "https://www.dwolla.com", external: true }}
      icon={guideIcon}
      badge="BADGETEXT"
      topic="This is the Topic."
      description="This is a  description.An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
    />
  ));
