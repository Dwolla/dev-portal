import { type TableContents } from "../../../app/components/base/material-ui/Table";
import HalLink from "../HalLink";
import RequestResponseObject from "./RequestResponseObject";
import { Link } from "../../../app/components/base/Typography";

export default {
  headers: ["Property", "Type", "Description"],
  rows: [
    [
      [
        "_links",
        "object",
        <span>
          <Link href="/api-reference#links" text="HAL-JSON" /> links to related
          resources.
        </span>,
      ],
      {
        title: "Webhook Links Object",
        headers: ["Link", "Description"],
        rows: [
          [
            ["self", "References the current Webhook resource."],
            HalLink("webhooks"),
          ],
          [
            [
              "subscription",
              "References the webhook subscription that the webhooks are associated with.",
            ],
            HalLink("webhook-subscriptions"),
          ],
        ],
      },
    ],
    ["id", "string <uuid>", "Webhook unique identifier."],
    [
      "topic",
      "string",
      "Webhook topic that denotes the type of action that occurred with Dwolla.",
    ],
    [
      "accountId",
      "string <uuid>",
      "Account associated with the webhook notification.",
    ],
    [
      "eventId",
      "string <uuid>",
      "Unique Event ID. An Event ID is used along with the created timestamp for idempotent event processing.",
    ],
    [
      "subscriptionId",
      "string <date-time>",
      "Webhook subscription id that this webhook is associated with.",
    ],
    [
      ["attempts", "object", "Array of attempt JSON object."],
      {
        title: "Attempts Object",
        headers: ["Parameter", "Type", "Description"],
        rows: [
          ["id", "string <uuid>", "Unique id of webhook delivery attempt."],
          [
            ["request", "object", "Request JSON object."],
            RequestResponseObject("request"),
          ],
          [
            ["response", "object", "Response JSON object."],
            RequestResponseObject("response"),
          ],
        ],
      },
    ],
  ],
} as TableContents;
