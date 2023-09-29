import { storiesOf } from "@storybook/react";
import Table, {
  TableContents,
} from "../../../app/components/base/material-ui/Table";

/* eslint-disable-next-line import/prefer-default-export */
export const INITIATE_TRANSFER_TABLE: TableContents = {
  headers: ["Property", "Required", "Type", "Description"],
  rows: [
    [
      [
        <code>_links</code>,
        "Yes",
        "object",
        "A JSON object describing the source and destination Funding Source for a Transfer",
      ],
      {
        title: "Transfer Links Object",
        headers: ["Property", "Required", "Type", "Description"],
        rows: [
          [
            [
              <code>source</code>,
              "Yes",
              "object",
              "A JSON object that represents the Funding Source funds are sent from",
            ],
            {
              title: "Source Object",
              headers: ["Property", "Required", "Type", "Description"],
              rows: [
                [
                  <code>href</code>,
                  "Yes",
                  "string",
                  "The fully-qualified URL of the Funding Source that funds will be sent from",
                ],
              ],
            },
          ],
          [
            [
              <code>destination</code>,
              "Yes",
              "object",
              "A JSON object that represents the Funding Source funds are sent to",
            ],
            {
              title: "Destination Object",
              headers: ["Property", "Required", "Type", "Description"],
              rows: [
                [
                  <code>href</code>,
                  "Yes",
                  "string",
                  "The fully-qualified URL of the Funding Source that funds will be sent to",
                ],
              ],
            },
          ],
        ],
      },
    ],
    [
      <code>correlationId</code>,
      "No",
      "string",
      "A pseudo-random, unique identifier that can be used to correlate the Transfer resource",
    ],
  ],
};

storiesOf("Material UI/Table", module).add("default", () => (
  <Table table={INITIATE_TRANSFER_TABLE} />
));
