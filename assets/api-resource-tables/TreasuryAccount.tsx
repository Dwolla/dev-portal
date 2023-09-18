import { type TableContents } from "../../app/components/base/material-ui/Table";
import HalLink from "./HalLink";
import { Link } from "../../app/components/base/Typography";

export default {
  headers: ["Property", "Type", "Description"],
  rows: [
    [
      [
        "_links",
        "object",
        <span>
          <Link href="/api-reference#links" text="HAL-JSON" /> links that
          represent resource relationships for the current Treasury Account.
        </span>,
      ],
      {
        title: "Treasury Account Links",
        headers: ["Link", "Description"],
        rows: [
          [
            ["self", "References the current Treasury Account resource."],
            HalLink("treasury-account"),
          ],
          [
            [
              "treasury-partner",
              <span>
                References the{" "}
                <Link
                  href="/api-reference/connect/treasury-partners"
                  text="Treasury Partner"
                />{" "}
                that this resource is connected to.
              </span>,
            ],
            HalLink("treasury-partners"),
          ],
          [
            [
              "account",
              <span>
                References the{" "}
                <Link href="/api-reference/connect/accounts" text="Account" />{" "}
                that created this resource.
              </span>,
            ],
            HalLink("account"),
          ],
        ],
      },
    ],
    [
      "id",
      "string <uuid>",
      "Unique identifier of resource that is assigned by Dwolla.",
    ],
    [
      "name",
      "string",
      <span>
        Name of resource that is assigned by your application when{" "}
        <Link
          href="/api-reference/connect/treasury-accounts/create"
          text="resource is created"
        />
        .
      </span>,
    ],
    [
      "created",
      "string <date-time>",
      "ISO-8601 timestamp of when the resource was created.",
    ],
    [
      [
        "treasuryPartnerContext",
        "object",
        "Additional context used for making bank API calls.",
      ],
      {
        title: "Treasury Partner Context Object",
        headers: ["Property", "Description"],
        rows: [
          [
            "achCoId",
            <span>
              <em>(Optional)</em> Present if Treasury Account was created with
              J.P. Morgan connection.
            </span>,
          ],
          [
            "gatewayCompanyId",
            <span>
              <em>(Optional)</em> Present if Treasury Account was created with
              Wells Fargo connection.
            </span>,
          ],
        ],
      },
    ],
  ],
} as TableContents;
