import { type NestedTableContents } from "../../app/components/base/material-ui/Table";

export default (resourceType: string) =>
  ({
    title: "HalLink",
    headers: ["Property", "Description"],
    rows: [
      [
        "href",
        "Absolute URL that can be used to create, retrieve, update or delete a resource.",
      ],
      ["type", <code>application/vnd.dwolla.v1.hal+json</code>],
      ["resource-type", <code>{resourceType}</code>],
    ],
  } as NestedTableContents);
