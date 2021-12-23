import React from "react";
import Collapsible from "../../components/base/Collapsible";
import CodeExamples, { CodeExample } from "../partial/code/CodeExamples";

type Props = {
  topic: string;
  senderOrReceiver: "SENDER" | "RECEIVER";
  payload: any;
};

// WebhookCodeBlock styles payload prop using <CodeExamlpes>
// and wraps it in <Collapsible variant="webhook">
function WebhookCodeBlock({ topic, senderOrReceiver, payload }: Props) {
  return (
    <Collapsible
      variant="webhook"
      triggerText={topic}
      extraTrigger={senderOrReceiver}
    >
      <CodeExamples title="WEBHOOK">
        <CodeExample language="raw">
          {JSON.stringify(payload, null, 2)}
        </CodeExample>
      </CodeExamples>
    </Collapsible>
  );
}
export default WebhookCodeBlock;
