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
  ],
} as TableContents;
