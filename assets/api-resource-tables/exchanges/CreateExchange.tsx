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
          represent resource relationships required for creating an exchange.
        </span>,
      ],
      {
        title: "Links Object",
        headers: ["Link", "Description"],
        rows: [
          [
            [
              "exchange-partners",
              <span>
                References the Exchange Partner resource that identifies the
                third-party provider used for creating an exchange.
              </span>,
            ],
            HalLink("exchange-partners"),
          ],
        ],
      },
    ],
    [
      "token",
      "conditional",
      "string",
      <span>
        A third party provider processor token. <strong>Required</strong> for
        MX, Flinks, and Plaid integrations.
      </span>,
    ],
    [
      [
        "mx",
        "conditional",
        "object",
        <span>
          An MX object containing <code>availableConnectionToken</code>{" "}
          information for the selected bank account via the Instant Account
          Verification (IAV) flow. <strong>Note:</strong> Only used with{" "}
          <Link
            href="/docs/connect/api-reference/open-banking/create-exchange-session-for-an-external-party"
            text="Exchange Sessions API"
          />{" "}
          and pre-integrated open banking providers.
        </span>,
      ],
      {
        title: "MX Object",
        headers: ["Parameter", "Type", "Description"],
        rows: [
          [
            "availableConnectionToken",
            "string",
            <span>
              The <code>availableConnectionToken</code> is tied to the{" "}
              <Link
                href="/docs/connect/api-reference/open-banking/create-exchange-session-for-an-external-party"
                text="Exchange Sessions API"
              />{" "}
              within Dwolla&apos;s Open Banking product.
            </span>,
          ],
        ],
      },
    ],
    [
      [
        "finicity",
        "conditional",
        "object",
        <span>
          Finicity resource object containing access key{" "}
          <strong>receipt</strong> information. Required for Finicity
          integration. See <code>finicity</code> JSON object below (including
          nested <code>product</code>
          and <code>accessPeriod</code> JSON objects).
        </span>,
      ],
      {
        title: "Finicity Object",
        headers: ["Parameter", "Type", "Description"],
        rows: [
          [
            "profile",
            "integer",
            "Int value obtained by the party integrating with Finicity",
          ],
          [
            "version",
            "string",
            "Int value obtained by the party integrating with Finicity",
          ],
          [
            "receiptId",
            "string",
            <span>
              String value obtained by the party integrating with Finicity. From
              Finicity
              <code>
                https://api.finicity.com/aggregation/v1/partners/accessKey
                response
              </code>
              .
            </span>,
          ],
          [
            "receiptVersion",
            "string",
            <span>
              String value obtained by the party integrating with Finicity. From
              Finicity
              <code>
                https://api.finicity.com/aggregation/v1/partners/accessKey
                response
              </code>
              .
            </span>,
          ],
          [
            "customerId",
            "string",
            <span>
              String value obtained by the party integrating with Finicity. From
              Finicity
              <code>
                https://api.finicity.com/aggregation/v1/partners/accessKey
                response
              </code>
              .
            </span>,
          ],
          [
            "partnerId",
            "integer",
            <span>
              Int value obtained by the party integrating with Finicity. From
              Finicity
              <code>
                https://api.finicity.com/aggregation/v1/partners/accessKey
                response
              </code>
              .
            </span>,
          ],
          [
            [
              "products",
              "object",
              "Finicity resource object containing access key receipt information. Required for Finicity integration. See finicity JSON object below (including nested product and accessPeriod JSON objects).",
            ],
            {
              title: "Products",
              headers: ["Parameter", "Type", "Description"],
              rows: [
                [
                  "product",
                  "string",
                  "Absolute URL that can be used to create, retrieve, update or delete a resource.",
                ],
                [
                  "accountId",
                  "string",
                  <span>
                    String value obtained by the party integrating with
                    Finicity. From Finicity
                    <code>
                      https://api.finicity.com/aggregation/v1/partners/accessKey
                      response
                    </code>
                  </span>,
                ],
                [
                  [
                    "accessPeriod",
                    "object",
                    "Finicity resource object containing access key receipt information. Required for Finicity integration. See finicity JSON object below (including nested product and accessPeriod JSON objects).",
                  ],
                  {
                    title: "Access Period",
                    headers: ["Parameter", "Type", "Description"],
                    rows: [
                      [
                        "type",
                        "string",
                        "Absolute URL that can be used to create, retrieve, update or delete a resource.",
                      ],
                      [
                        "startTime",
                        "integer",
                        <span>
                          String value obtained by the party integrating with
                          Finicity. From{" "}
                          <code>
                            Finicity
                            https://api.finicity.com/aggregation/v1/partners/accessKey
                          </code>{" "}
                          response
                        </span>,
                      ],
                      [
                        "endTime",
                        "integer",
                        <span>
                          Finicity Access Period objects obtained by the party
                          integrating with Finicity. From Finicity{" "}
                          <code>
                            https://api.finicity.com/aggregation/v1/partners/accessKey
                          </code>{" "}
                          response
                        </span>,
                      ],
                    ],
                  },
                ],
              ],
            },
          ],
        ],
      },
    ],
  ],
} as TableContents;
