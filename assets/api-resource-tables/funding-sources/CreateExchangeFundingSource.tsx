import { type TableContents } from "../../../app/components/base/material-ui/Table";
import HalLink from "../HalLink";
import { Link } from "../../../app/components/base/Typography";

export default {
  headers: ["Property", "Required", "Type", "Description"],
  rows: [
    [
      [
        "_links",
        "yes",
        "object",
        <span>
          <Link href="/api-reference#links" text="HAL-JSON" /> links that
          represent resource relationships required for creating a funding
          source.
        </span>,
      ],
      {
        title: "Links Object",
        headers: ["Link", "Description"],
        rows: [
          [
            [
              "exchange",
              <span>
                References the Exchange resource in relation to which the
                funding source is created. Learn{" "}
                <Link
                  href="/api-reference/connect/exchanges"
                  text="how to create an exchange."
                />
              </span>,
            ],
            HalLink("exchange"),
          ],
        ],
      },
    ],
    [
      "name",
      "yes",
      "string",
      "Arbitrary nickname for the funding source. Must be 50 characters or less.",
    ],
    [
      "bankAccountType",
      "yes",
      "string",
      "Type of bank account. Valid values are: checking or savings.",
    ],
    [
      "correlationId",
      "no",
      "string",
      <span>
        A unique string value attached to a funding source which can be used for
        traceability between Dwolla and your application. <b>Note:</b> A
        correlationId is not a replacement for an{" "}
        <Link href="/api-reference#idempotency-key" text="idempotency-key" />.{" "}
        <br /> Must be less than or equal to 255 characters and contain no
        spaces. <br /> Acceptable characters are:{" "}
        <code>a-Z, 0-9, -, . and _</code>. <br /> <b>Note:</b> Sensitive
        Personal Identifying Information (PII) should not be used in this field
        and it is recommended to use a random value for correlationId, like a
        UUID.
      </span>,
    ],
  ],
} as TableContents;
