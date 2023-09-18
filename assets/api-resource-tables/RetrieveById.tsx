import { type TableContents } from "../../app/components/base/material-ui/Table";

export default {
  headers: ["Parameter", "Required", "Type", "Description"],
  rows: [["id", "yes", "string <uuid>", "Resource unique identifier."]],
} as TableContents;
