import renderer from "react-test-renderer";
import WebhookCodeBlock from "../WebhookCodeBlock";

const dummyJson = {
  webhookTopic: "customer_transfer_completed",
  senderOrReceiver: "SENDER",
  webhookPayload: {
    _links: {
      account: {
        href:
          "https://api-sandbox.dwolla.com/accounts/0ee84069-47c5-455c-b425-633523291dc3",
        "resource-type": "account",
        type: "application/vnd.dwolla.v1.hal+json",
      },
      customer: {
        href:
          "https://api-sandbox.dwolla.com/customers/70088704-f2f1-443e-bd41-f20305d6c912",
        "resource-type": "customer",
        type: "application/vnd.dwolla.v1.hal+json",
      },
      resource: {
        href:
          "https://api-sandbox.dwolla.com/transfers/949df329-c23f-e911-8116-917813db6033",
        type: "application/vnd.dwolla.v1.hal+json",
      },
      self: {
        href:
          "https://api-sandbox.dwolla.com/events/19670af8-67df-46cf-be46-9eb2f77a0c7a",
        "resource-type": "event",
        type: "application/vnd.dwolla.v1.hal+json",
      },
    },
    created: "2019-03-06T03:46:13.645Z",
    id: "19670af8-67df-46cf-be46-9eb2f77a0c7a",
    resourceId: "949df329-c23f-e911-8116-917813db6033",
    topic: "customer_transfer_completed",
  },
};

test("TransferWorkflow", () => {
  const tree = renderer
    .create(
      <WebhookCodeBlock
        topic={dummyJson.webhookTopic}
        senderOrReceiver="SENDER"
        payload={dummyJson.webhookPayload}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
