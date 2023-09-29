import React, { Fragment, ReactElement, useState } from "react";
import {
  IconButton,
  Paper,
  styled,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer as MuiTableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ExpandLessOutlined, ExpandMoreOutlined } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import { slugify } from "../../../modules/helpers";
import { GREY_1, GREY_3_44, PURPLE_012 } from "../../colors";

const ExpandableTableCell = styled(TableCell, { name: "ExpandableTableCell" })(
  () => ({
    width: "3.5rem",
  })
);

const NestedTableContainer = styled(MuiTableContainer, {
  name: "NestedTableContainer",
})(() => ({
  padding: "1rem 2rem",
}));

const NestedTableWrapper = styled(Paper, { name: "NestedTable" })(() => ({
  background: `${GREY_1}`,
  boxShadow: `0px 0px 0px 1px ${PURPLE_012};`,
  padding: "1rem",
}));

const TitleTypography = styled(Typography, { name: "TitleTypography" })(() => ({
  background: `${GREY_3_44}`,
  borderRadius: "0.25rem",
  padding: "0.5rem",
}));

export interface TableProps {
  table: TableContents | NestedTableContents;
}

export interface TableContents {
  headers: string[];
  rows: ContentRow[];
}

export interface NestedTableContents extends TableContents {
  title: string;

  /**
   * This property is optional since it's autopopulated when the component renders.
   *
   * A custom slugged title can be added here; however, it's best to let the component
   * generate it since it must be unique across all nested tables within the current page.
   */
  sluggedTitle?: string;
}

type Content = ReactElement | string;
type ContentRow = Content[] | NestedTableContentRow;
type NestedTableContentRow = [Content[], NestedTableContents];
type SluggedNestedTableContentRow = [
  Content[],
  NestedTableContents & Required<Pick<NestedTableContents, "sluggedTitle">>
];

const isElementOrString = (obj: any): obj is ReactElement | string =>
  React.isValidElement(obj) || typeof obj === "string";

const isNestedTableContents = (obj: any): obj is NestedTableContents =>
  typeof obj?.title !== "undefined";

const isNestedTableRow = (obj: any): obj is NestedTableContentRow =>
  obj.length === 2 &&
  Array.isArray(obj[0]) &&
  obj[0].every(isElementOrString) &&
  typeof obj[1]?.title !== "undefined";

const isSluggedNestedTableRow = (
  obj: any
): obj is SluggedNestedTableContentRow =>
  isNestedTableRow(obj) && typeof obj[1]?.sluggedTitle !== "undefined";

const isTableExpandable = (table: TableContents): boolean =>
  table.rows.some(isNestedTableRow);

const addUniqueIdToNestedTabled = (table: TableContents): TableContents => ({
  ...table,
  rows: table.rows.map((item): ContentRow => {
    if (isNestedTableRow(item) && typeof item[1].sluggedTitle === "undefined") {
      // eslint-disable-next-line no-param-reassign
      item[1].sluggedTitle = `${slugify(item[1].title)}-${uuidv4()}`;
    }
    return item;
  }),
});

export default function Table({ table }: TableProps): ReactElement {
  const sluggedTable = addUniqueIdToNestedTabled(table);

  const TableContainer = isNestedTableContents(sluggedTable)
    ? NestedTableContainer
    : MuiTableContainer;
  const TableWrapper = isNestedTableContents(sluggedTable)
    ? NestedTableWrapper
    : Fragment;

  const [expanded, setExpanded] = useState<string[]>([]);
  const addExpanded = (slug: string): string[] => [...expanded, slug];
  const removeExpanded = (slug: string): string[] =>
    expanded.filter((value) => value !== slug);

  const handleExpandClicked = (row: SluggedNestedTableContentRow) => (): void =>
    !expanded.includes(row[1].sluggedTitle)
      ? setExpanded([...addExpanded(row[1].sluggedTitle)])
      : setExpanded([...removeExpanded(row[1].sluggedTitle)]);

  const getCellElements = (row: ContentRow): ReactElement[] => {
    const cells = isNestedTableRow(row) ? row[0] : row;
    const borderBottom =
      isSluggedNestedTableRow(row) && expanded.includes(row[1].sluggedTitle)
        ? 0
        : null;
    const mappedCells = cells.map((cell, cellIndex) => (
      <TableCell key={`cell-${cellIndex}`} sx={{ borderBottom }}>
        {cell}
      </TableCell>
    ));

    if (isSluggedNestedTableRow(row)) {
      const ExpandIcon = expanded.includes(row[1].sluggedTitle)
        ? ExpandLessOutlined
        : ExpandMoreOutlined;

      mappedCells.push(
        <TableCell sx={{ borderBottom }}>
          <IconButton onClick={handleExpandClicked(row)} size="small">
            <ExpandIcon />
          </IconButton>
        </TableCell>
      );
    } else if (!isNestedTableContents(sluggedTable)) {
      mappedCells.push(<TableCell></TableCell>);
    }
    return mappedCells;
  };

  return (
    <TableContainer>
      <TableWrapper>
        {isNestedTableContents(sluggedTable) && (
          <TitleTypography>{sluggedTable.title}</TitleTypography>
        )}

        <MuiTable>
          <TableHead>
            <TableRow>
              {sluggedTable.headers.map((item, itemIndex) => (
                <TableCell key={`item-${itemIndex}`}>{item}</TableCell>
              ))}

              {isTableExpandable(sluggedTable) && <ExpandableTableCell />}
            </TableRow>
          </TableHead>

          <TableBody>
            {sluggedTable.rows.map((row, rowIndex) => (
              <React.Fragment key={`row-${rowIndex}`}>
                <TableRow>{getCellElements(row)}</TableRow>

                {isSluggedNestedTableRow(row) &&
                  expanded.includes(row[1].sluggedTitle) && (
                    <TableRow>
                      <TableCell colSpan={99} sx={{ padding: 0 }}>
                        <Table table={row[1]} />
                      </TableCell>
                    </TableRow>
                  )}
              </React.Fragment>
            ))}
          </TableBody>
        </MuiTable>
      </TableWrapper>
    </TableContainer>
  );
}
