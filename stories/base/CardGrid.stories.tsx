import * as React from "react";
import { storiesOf } from "@storybook/react";
import Card from "../../components/base/Card";
import CardGrid from "../../components/base/CardGrid";
import guideIcon from "../../public/images/guides-icon-large.svg";

storiesOf("base|CardGrid", module).add("default", () => (
  <CardGrid>
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
));
