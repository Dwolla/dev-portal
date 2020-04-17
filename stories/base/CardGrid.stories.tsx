import * as React from "react";
import styled from "@emotion/styled";
import { storiesOf } from "@storybook/react";
import Card from "../../components/base/Card";
import CardGrid from "../../components/base/CardGrid";
import guideIcon from "../../public/images/guides-icon-large.svg";

const Container = styled.div`
  padding: 30px;
`;

storiesOf("base|CardGrid", module).add("default", () => (
  <Container>
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
  </Container>
));
