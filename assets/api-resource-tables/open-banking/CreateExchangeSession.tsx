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
          represent resource relationships required for creating an exchange
          session. (See more)
        </span>,
      ],
      {
        title: "Links Object",
        headers: ["Link", "Required", "Description"],
        rows: [
          [
            [
              "exchange-partners",
              "yes",
              "References the Exchange Partner resource that identifies the third-party provider used for creating an exchange session.",
            ],
            HalLink("exchange-partners"),
          ],
          [
            [
              "redirect-url",
              "conditional",
              <span>
                A redirect URL for Visa sessions and mobile applications using
                Plaid. <br /> <br /> <strong> For Visa</strong>, this URL
                specifies where the user will be redirected after completing the
                authorization process with Visa. Dwolla will validate the
                provided redirect URL against the one previously configured for
                your application. <br /> <br /> <strong> For Plaid</strong>, use
                an Android package name for Android (e.g.,
                <code>com.example.package</code>) or a valid URL for iOS (e.g.,
                <code>https://example.com/app123</code>).,
              </span>,
            ],
            HalLink("redirect-url"),
          ],
        ],
      },
    ],
  ],
} as TableContents;
