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
  ],
} as TableContents;
