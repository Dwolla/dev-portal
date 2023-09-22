import { type TableContents } from "../../../app/components/base/material-ui/Table";
import HalLink from "../HalLink";
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
        title: "Webhook Subscription Links Object",
        headers: ["Link", "Description"],
        rows: [
          [
            ["self", "References the current Webhook Subscription resource."],
            HalLink("webhook-subscription"),
          ],
          [
            [
              "webhooks",
              <span>
                GET this link to{" "}
                <Link
                  text="retrieve the list of webhooks"
                  href="/api-reference/connect/funding-sources/retrieve"
                />{" "}
                that are associated with the Webhook Subscription.
              </span>,
            ],
            HalLink("webhook"),
          ],
        ],
      },
    ],
    ["id", "string <uuid>", "Webhook subscription unique identifier."],
    [
      "url",
      "string",
      "Subscribed url where Dwolla should deliver the webhook notification. ",
    ],
    [
      "paused",
      "boolean",
      <span>
        A boolean <code>true</code> or <code>false</code> value indicating if
        the webhook subscription is paused. A webhook subscription will be
        automatically paused after 400 consecutive failures.
      </span>,
    ],
    [
      "created",
      "string <date-time>",
      "ISO-8601 timestamp of when the resource was created.",
    ],
  ],
} as TableContents;
