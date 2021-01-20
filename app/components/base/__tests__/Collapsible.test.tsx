import renderer from "react-test-renderer";
import Collapsible from "../Collapsible";
import { Paragraph, UnorderedList } from "../Typography";

const Question1 =
  "My Customer has a retry status. What activity would they be able to engage in while being in ‘retry’ status, as it relates to the Dwolla Platform?";

const Question2 =
  "My Customer has a document status. Can I submit more than one document via the API?";

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

test("Collapsible list", () => {
  const tree = renderer
    .create(<Collapsible triggerText={Question1}>{Answer1}</Collapsible>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("Collapsible paragraph", () => {
  const tree = renderer
    .create(<Collapsible triggerText={Question2}>{Answer2}</Collapsible>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
