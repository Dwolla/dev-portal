import { type NestedTableContents } from "../../../app/components/base/material-ui/Table";

export default (resourceType: string) =>
  ({
    title: `${resourceType}`,
    headers: ["Parameter", "Type", "Description"],
    rows: [
      ["timestamp", "string <date-time>", "ISO-8601 timestamp."],
      ["url", "string", "URL where data was sent to/received from."],
      [
        "headers",
        "object<aray>",
        <span>
          Array of objects with keys <code>name</code> and <code>value</code>{" "}
          representative of HTTP headers.
        </span>,
      ],
      ["body", "object", "An Event payload for the webhook."],
    ],
  } as NestedTableContents);
