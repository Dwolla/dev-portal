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
        title: "Transfers Links Object",
        headers: ["Link", "Description"],
        rows: [
          [
            ["self", "References the current Transfer resource."],
            HalLink("transfer"),
          ],
          [
            [
              "source",
              <span>
                GET this link to retrieve the{" "}
                <Link text="Account" href="/api-reference/connect/accounts" />{" "}
                or the{" "}
                <Link
                  text="External Party"
                  href="/api-reference/connect/external-parties"
                />{" "}
                that was the <code>source</code> of the transfer.
              </span>,
            ],
            HalLink('"account" or "external-party"'),
          ],
          [
            [
              "source-funding-source",
              <span>
                GET this link to{" "}
                <Link
                  text="retrieve the funding source"
                  href="/api-reference/connect/funding-sources/retrieve"
                />{" "}
                that was the <code>source</code> of the transfer.
              </span>,
            ],
            HalLink("funding-source"),
          ],
          [
            [
              "destination",
              <span>
                GET this link to retrieve the{" "}
                <Link text="Account" href="/api-reference/connect/accounts" />{" "}
                or the{" "}
                <Link
                  text="External Party"
                  href="/api-reference/connect/external-parties"
                />{" "}
                that was the <code>destination</code> of the transfer.
              </span>,
            ],
            HalLink('"account" or "external-party"'),
          ],
          [
            [
              "destination-funding-source",
              <span>
                GET this link to{" "}
                <Link
                  text="retrieve the funding source"
                  href="/api-reference/connect/funding-sources/retrieve"
                />{" "}
                that was the <code>destination</code> of the transfer.
              </span>,
            ],
            HalLink("funding-source"),
          ],
        ],
      },
    ],
    [
      "id",
      "string <uuid>",
      "Unique identifier of Transfer that is assigned by Dwolla.",
    ],
    [
      "created",
      "string <date-time>",
      "ISO-8601 timestamp of when the resource was created.",
    ],
    [
      ["amount", "object", "An amount JSON object."],
      {
        title: "Amount Object",
        headers: ["Property", "Type", "Description"],
        rows: [
          ["value", "string", "Amount of money that was transferred."],
          ["currency", "string", "Possible values: USD"],
        ],
      },
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
      "status",
      "string",
      <span>
        Possible values: <code>created</code>, <code>pending</code>,{" "}
        <code>failed</code>, <code>processed</code> or <code>returned</code>
      </span>,
    ],
    [
      "processingChannel",
      "string",
      <span>
        Possible values: <code>ach</code>
      </span>,
    ],
    [
      [
        "failureReason",
        "object",
        <span>
          Failure reason object. Only present when status is <code>failed</code>{" "}
          or
          <code>returned</code>.
        </span>,
      ],
      {
        title: "failureReason Object",
        headers: ["Property", "Type", "Description"],
        rows: [
          ["description", "string", "Description of the failure reason."],
          [
            "code",
            "string",
            "ACH return code. Included if the transfer was returned due to an ACH failure.",
          ],
          [
            "explanation",
            "string",
            "Further explanation of why the failure occurred.",
          ],
        ],
      },
    ],
  ],
} as TableContents;
