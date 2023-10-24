import { type TableContents } from "../../../app/components/base/material-ui/Table";
import HalLink from "../HalLink";
import { Link } from "../../../app/components/base/Typography";
import ContentTooltip from "../../../app/components/base/ContentTooltip";

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
          source for an Account.
        </span>,
      ],
      {
        title: "Links Object",
        headers: ["Link", "Description"],
        rows: [
          [
            [
              <span>
                <ContentTooltip preset="treasury-account">
                  treasury-account
                </ContentTooltip>
              </span>,
              <span>
                References the Treasury Account resource in relation to which
                the funding source is created.
                <Link
                  href="https://www.dwolla.com/dwolla-connect/#cta-form-1"
                  text=" Contact us "
                />
                to learn how to create a Treasury Account.
              </span>,
            ],
            HalLink("treasury-account"),
          ],
        ],
      },
    ],
    [
      "accountNumber",
      "yes",
      "string",
      "The bank account number. The account number is validated to check if it is a numeric string of 4-17 digits.",
    ],
    [
      "routingNumber",
      "yes",
      "string",
      'A bank routing number that identifies a bank in the U.S. Validation of the routing number includes: a checksum, the first two digits of the routing number must fall within the range "01" through "12", or "21" through "32", and the string value must consist of nine digits.',
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
