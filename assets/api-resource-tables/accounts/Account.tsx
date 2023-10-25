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
        title: "Account Links Object",
        headers: ["Link", "Description"],
        rows: [
          [
            ["self", "References the current Account resource."],
            HalLink("account"),
          ],
          [
            [
              "transfers",
              "The URL that can be used to retrieve the Dwolla account's list of transfers.",
            ],
            HalLink("transfers"),
          ],
          [
            [
              "funding-sources",
              "The URL that can be used to retrieve the Dwolla account's list of funding sources.",
            ],
            HalLink("funding-sources"),
          ],
        ],
      },
    ],
    [
      "id",
      "string <uuid>",
      "Unique identifier of Account that is assigned by Dwolla.",
    ],
    ["name", "string", "Name of the Account provided upon creation."],
    [
      "created",
      "string <date-time>",
      "ISO-8601 timestamp of when the resource was created.",
    ],
  ],
} as TableContents;
