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
          resources and actions.
        </span>,
      ],
      {
        title: "Funding Sources Links Object",
        headers: ["Link", "Description"],
        rows: [
          [
            ["self", "References the current Funding Source resource."],
            HalLink("funding-source"),
          ],
          [
            [
              "treasury-account",
              "References the Treasury Account in relation to which the funding source was created.",
            ],
            HalLink("treasury-account"),
          ],
          [
            [
              "remove",
              "POST to this link to remove the funding funding source from the Account.",
            ],
            HalLink("remove"),
          ],
        ],
      },
    ],
    [
      "id",
      "string <uuid>",
      "Unique identifier of Funding Source that is assigned by Dwolla.",
    ],
    [
      "bankAccountType",
      "string",
      <span>
        An attribute for funding sources that determines the type of account.
        Possible values are <code>checking</code> or <code>savings</code>.
      </span>,
    ],
    [
      "name",
      "string",
      "Arbitrary nickname for the funding source provided upon creation.",
    ],
    [
      "created",
      "string <date-time>",
      "ISO-8601 timestamp of when the resource was created.",
    ],
    [
      "removed",
      "boolean",
      <span>
        Determines if the funding source has been{" "}
        <Link
          href="/api-reference/connect/funding-sources/remove"
          text="removed."
        />
      </span>,
    ],
    [
      "correlationId",
      "string",
      "A unique string value attached to a funding source which can be used for traceability between Dwolla and your application. **Note:** A correlationId is not a replacement for an [idempotency-key](https://developers.dwolla.com/api-reference#idempotency-key). <br /> Must be less than or equal to 255 characters and contain no spaces. <br /> Acceptable characters are: `a-Z`, `0-9`, `-`, `.`, and `_`. <br /> **Note:** Sensitive Personal Identifying Information (PII) should not be used in this field and it is recommended to use a random value for correlationId, like a UUID.",
    ],
  ],
} as TableContents;
