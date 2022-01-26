import * as React from "react";
import { storiesOf } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import FundsFlowSelector from "../../app/components/base/FundsFlowSelector";

const senderTypeOptions = [
  { value: "account", label: "Account" },
  { value: "vcr", label: "Verified Customer" },
  { value: "cr", label: "Unverified Customer" },
];

const senderSourceOptions = [
  { value: "balance", label: "Balance" },
  { value: "bank", label: "Bank" },
  { value: "r01", label: "R01-Bank" },
];

const receiverTypeOptions = [
  { value: "account", label: "Account" },
  { value: "vcr", label: "Verified Customer" },
  { value: "cr", label: "Unverified Customer" },
  { value: "ro", label: "Receive-Only User" },
];

const receiverDestinationOptions = [
  { value: "balance", label: "Balance" },
  { value: "bank", label: "Bank" },
  { value: "r03", label: "R03-Bank" },
  { value: "card", label: "Debit Card" },
];

storiesOf("base|FundsFlowSelector", module)
  .addDecorator(centered)
  .add("default", () => {
    const [setState] = React.useState();
    return (
      <FundsFlowSelector
        senderTypeOptions={senderTypeOptions}
        senderSourceOptions={senderSourceOptions}
        receiverTypeOptions={receiverTypeOptions}
        receiverDestinationOptions={receiverDestinationOptions}
        setSelectedSender={setState}
        setSelectedSource={setState}
        setSelectedReceiver={setState}
        setSelectedDestination={setState}
      />
    );
  });
