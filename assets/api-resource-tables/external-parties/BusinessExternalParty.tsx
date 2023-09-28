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
        title: "External Party Links Object",
        headers: ["Link", "Description"],
        rows: [
          [
            ["self", "References the current External Party resource."],
            HalLink("external-party"),
          ],
        ],
      },
    ],
    ["id", "string <uuid>", "Unique external party identifier."],
    ["businessName", "string", "Business name of external party."],
    ["email", "string <email>", "Email address of external party."],
    ["externalPartyType", "string", "business"],
    [
      "created",
      "string <date-time>",
      "ISO-8601 timestamp of when the resource was created.",
    ],
  ],
} as TableContents;
