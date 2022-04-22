import * as React from "react";
import styled from "@emotion/styled";
import { storiesOf } from "@storybook/react";
import Card from "../../app/components/base/Card";
import CardGrid from "../../app/components/base/CardGrid";
import guideIcon from "../../assets/images/content-images/content-icons/guides-icon.svg";

const Container = styled.div`
  padding: 30px;
`;

storiesOf("base/CardGrid", module).add("default", () => (
  <Container>
    <CardGrid variant="default">
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
  </Container>
));
