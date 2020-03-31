import * as React from "react";
import { storiesOf } from "@storybook/react";
import Card from "../../components/base/Card";
import guideIcon from "../../public/images/guides-icon-large.svg";

storiesOf("base|Card", module)
  .add("default", () => (
    <Card
      icon={guideIcon}
      topic="This is the Topic"
      description="An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
    />
  ))
  .add("`link`", () => (
    <Card
      link
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
      link
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
      link
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
      link
      icon={guideIcon}
      badge="BADGETEXT"
      topic="This is the Topic for center aligned cards reperesenting CTAs."
      description="This is a short description."
    />
  ));
