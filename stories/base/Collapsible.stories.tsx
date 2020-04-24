import * as React from "react";
import styled from "@emotion/styled";
import { storiesOf } from "@storybook/react";
import Collapsible from "../../components/base/Collapsible";
import { UnorderedList, Paragraph } from "../../components/base/Typography";

const ParentDiv = styled.div`
  padding: 20px;
  > * {
    margin-top: 30px;
  }
`;
const Question1 =
  "My Customer has a retry status. What activity would they able to engage in while being in ‘retry’ status, as it relates to the Dwolla Platform?";

const Question2 =
  "My Customer has a document status. Can I submit more than one document via the API?";

const Question3 =
  "My Customer has a retry status. What activity would they able to engage in while being in ‘retry’ status, as it relates to the Dwolla Platform?";

const Question4 =
  "My Customer needs to send more funds than is allowed in my Dwolla services agreement. What is the best way to go about this?";

const Answer1 = (
  <UnorderedList>
    {[
      { id: "1", text: "Send funds - No" },
      { id: "2", text: "Send funds - No" },
      {
        id: "3",
        text:
          "Receive funds - Yes - Note that funds will only process to their balance and the transfer will stay pending until the Customer has been verified.",
      },
      { id: "4", text: "Add and verify a bank funding source - Yes" },
    ]}
  </UnorderedList>
);

const Answer2 = (
  <Paragraph>
    Yes, although this is not necessary, nor recommended. Dwolla manually
    reviews all documents, so sending more documents than necessary may slow
    down the verification process for your Customers.
  </Paragraph>
);

const Answer3 = (
  <Paragraph>
    Receive funds - Yes - Note that funds will only process to their balance and
    the transfer will stay pending until the Customer has been verified.
  </Paragraph>
);

const Answer4 = (
  <>
    <Paragraph>
      Your Customer is able to send multiple separate transfers as long as each
      transfer amount is less than the transfer limit defined in your services
      agreement.
    </Paragraph>
    <em>
      <Paragraph>
        Example Scenario: The transaction limit for my Customer is $10,000 and
        they need to send $15,000.
        <br />
        In this case, you can prompt your Customer to send two transfers. One
        for $10,000 and another for $5,000.
      </Paragraph>
    </em>
  </>
);

storiesOf("base|Collapsible", module).add("default", () => (
  <ParentDiv>
    <Collapsible triggerText={Question1}>{Answer1}</Collapsible>
    <Collapsible triggerText={Question2}>{Answer2}</Collapsible>
    <Collapsible triggerText={Question3}>{Answer3}</Collapsible>
    <Collapsible triggerText={Question4}>{Answer4}</Collapsible>
  </ParentDiv>
));
