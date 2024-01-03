import { type TableContents } from "../../../app/components/base/material-ui/Table";
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
          represent resource relationships required for initiating a transfer.
        </span>,
      ],
      {
        title: "Links Object",
        headers: ["Link", "Description"],
        rows: [
          [
            "source",
            "URL of the funding source to use as the source of the transfer.",
          ],
          [
            "destination",
            "URL of the funding source to use as the destination of the transfer.",
          ],
        ],
      },
    ],
    [
      ["amount", "yes", "object", "An amount JSON object."],
      {
        title: "Amount Object",
        headers: ["Property", "Required", "Type", "Description"],
        rows: [
          [
            "value",
            "yes",
            "string",
            <span>
              Amount of money. If the entered amount has more than two decimal
              places, Dwolla will automatically round it to the nearest even
              integer using{" "}
              <Link
                text="Banker's Rounding"
                href="http://wiki.c2.com/?BankersRounding"
              />
              .
            </span>,
          ],
          ["currency", "Yes", "string", "Possible values: USD"],
        ],
      },
    ],
    [
      "correlationId",
      "no",
      "string",
      <span>
        A unique string value attached to a transfer which can be used for
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
