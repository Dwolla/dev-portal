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
import { slugify } from "../../../modules/helpers";

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
  background: "#F4F7FB",
  boxShadow: "0px 0px 0px 1px rgba(31, 31, 50, 0.12);",
  padding: "1rem",
}));

const TitleTypography = styled(Typography, { name: "TitleTypography" })(() => ({
  background: "rgba(201, 211, 224, 0.44);",
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
}

type Content = ReactElement | string;
type ContentRow = Content[] | NestedTableContentRow;
type NestedTableContentRow = [Content[], NestedTableContents];

const isElementOrString = (obj: any): obj is ReactElement | string =>
  React.isValidElement(obj) || typeof obj === "string";

const isNestedTableContents = (obj: any): obj is NestedTableContents =>
  typeof obj?.title !== "undefined";

const isNestedTableRow = (obj: any): obj is NestedTableContentRow =>
  obj.length === 2 &&
  Array.isArray(obj[0]) &&
  obj[0].every(isElementOrString) &&
  typeof obj[1]?.title !== "undefined";

const isTableExpandable = (table: TableContents): boolean =>
  table.rows.some(isNestedTableRow);

const slugRowTitle = (row: NestedTableContentRow): string =>
  slugify(row[1].title);

export default function Table({ table }: TableProps): ReactElement {
  const TableContainer = isNestedTableContents(table)
    ? NestedTableContainer
    : MuiTableContainer;
  const TableWrapper = isNestedTableContents(table)
    ? NestedTableWrapper
    : Fragment;

  const [expanded, setExpanded] = useState<string[]>([]);
  const addExpanded = (slug: string): string[] => [...expanded, slug];
  const removeExpanded = (slug: string): string[] =>
    expanded.filter((value) => value !== slug);

  const handleExpandClicked = (row: NestedTableContentRow) => (): void =>
    !expanded.includes(slugRowTitle(row))
      ? setExpanded([...addExpanded(slugRowTitle(row))])
      : setExpanded([...removeExpanded(slugRowTitle(row))]);

  const getCellElements = (row: ContentRow): ReactElement[] => {
    const cells = isNestedTableRow(row) ? row[0] : row;
    const borderBottom =
      isNestedTableRow(row) && expanded.includes(slugRowTitle(row)) ? 0 : null;
    const mappedCells = cells.map((cell) => (
      <TableCell sx={{ borderBottom }}>{cell}</TableCell>
    ));

    if (isNestedTableRow(row)) {
      const ExpandIcon = expanded.includes(slugRowTitle(row))
        ? ExpandLessOutlined
        : ExpandMoreOutlined;

      mappedCells.push(
        <TableCell sx={{ borderBottom }}>
          <IconButton onClick={handleExpandClicked(row)} size="small">
            <ExpandIcon />
          </IconButton>
        </TableCell>
      );
    } else if (!isNestedTableContents(table)) {
      mappedCells.push(<TableCell></TableCell>);
    }
    return mappedCells;
  };

  return (
    <TableContainer>
      <TableWrapper>
        {isNestedTableContents(table) && (
          <TitleTypography>{table.title}</TitleTypography>
        )}

        <MuiTable>
          <TableHead>
            <TableRow>
              {table.headers.map((item) => (
                <TableCell>{item}</TableCell>
              ))}

              {isTableExpandable(table) && <ExpandableTableCell />}
            </TableRow>
          </TableHead>

          <TableBody>
            {table.rows.map((row) => (
              <>
                <TableRow>{getCellElements(row)}</TableRow>

                {isNestedTableRow(row) &&
                  expanded.includes(slugRowTitle(row)) && (
                    <TableRow>
                      <TableCell colSpan={99} sx={{ padding: 0 }}>
                        <Table table={row[1]} />
                      </TableCell>
                    </TableRow>
                  )}
              </>
            ))}
          </TableBody>
        </MuiTable>
      </TableWrapper>
    </TableContainer>
  );
}
