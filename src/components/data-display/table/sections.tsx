import * as React from "react";
import { Checkbox } from "@/components/form/checkbox";
import { Box } from "@/components/layout/box";
import { Pagination } from "@/components/navigation/pagination";
import { cn } from "@/lib/utils";
import { sizeCellClass } from "./constants";
import {
  TableBody,
  TableCell,
  TableHeaderCell,
  TableRow,
} from "./parts";
import type { TableColumn, TableProps, TableSize } from "./types";
import { getColumnKey, getValue, normalizeCssSize } from "./utils";

export type TableRowMeta<RecordType extends object> = {
  record: RecordType;
  index: number;
  absoluteIndex: number;
  key: React.Key;
  disabled: boolean;
};

export type TableHeaderRowsProps<
  RecordType extends object = Record<string, unknown>,
> = {
  selectionEnabled: boolean;
  size: TableSize;
  allChecked: boolean;
  partiallyChecked: boolean;
  selectableKeysLength: number;
  onToggleCurrentPage: (checked: boolean) => void;
  indexColumn: TableProps<RecordType>["indexColumn"];
  visibleColumns: TableColumn<RecordType>[];
};

export function TableHeaderRows<
  RecordType extends object = Record<string, unknown>,
>(props: TableHeaderRowsProps<RecordType>) {
  const {
    selectionEnabled,
    size,
    allChecked,
    partiallyChecked,
    selectableKeysLength,
    onToggleCurrentPage,
    indexColumn,
    visibleColumns,
  } = props;

  return (
    <TableRow className="border-b border-slate-200">
      {selectionEnabled ? (
        <TableHeaderCell
          className={cn(sizeCellClass[size], "w-12 text-center")}
          style={{ textAlign: "center" }}
        >
          <Checkbox
            aria-label="选择当前页"
            checked={partiallyChecked ? "indeterminate" : allChecked}
            disabled={!selectableKeysLength}
            onCheckedChange={(checked) => onToggleCurrentPage(checked === true)}
          />
        </TableHeaderCell>
      ) : null}

      {indexColumn ? (
        <TableHeaderCell
          className={cn(sizeCellClass[size], "text-slate-600")}
          style={{
            width: normalizeCssSize(
              typeof indexColumn === "object" ? indexColumn.width : 64,
            ),
            textAlign: "center",
          }}
        >
          {typeof indexColumn === "object" ? (indexColumn.title ?? "#") : "#"}
        </TableHeaderCell>
      ) : null}

      {visibleColumns.map((column, columnIndex) => (
        <TableHeaderCell
          key={getColumnKey(column, columnIndex)}
          sx={column.headerSx}
          className={cn(sizeCellClass[size], column.headerClassName)}
          style={{
            width: normalizeCssSize(column.width),
            textAlign: column.headerAlign ?? column.align ?? "left",
          }}
        >
          {column.title ?? String(column.dataIndex ?? "")}
        </TableHeaderCell>
      ))}
    </TableRow>
  );
}

export type TableBodyRowsProps<
  RecordType extends object = Record<string, unknown>,
> = {
  bodyProps?: TableProps<RecordType>["bodyProps"];
  currentRowMeta: TableRowMeta<RecordType>[];
  selectedSet: Set<React.Key>;
  rowProps?: TableProps<RecordType>["rowProps"];
  size: TableSize;
  striped: boolean;
  hoverable: boolean;
  selectionEnabled: boolean;
  onToggleRow: (key: React.Key, checked: boolean) => void;
  indexColumn: TableProps<RecordType>["indexColumn"];
  visibleColumns: TableColumn<RecordType>[];
  empty: React.ReactNode;
  tableColumnCount: number;
};

export function TableBodyRows<
  RecordType extends object = Record<string, unknown>,
>(props: TableBodyRowsProps<RecordType>) {
  const {
    bodyProps,
    currentRowMeta,
    selectedSet,
    rowProps,
    size,
    striped,
    hoverable,
    selectionEnabled,
    onToggleRow,
    indexColumn,
    visibleColumns,
    empty,
    tableColumnCount,
  } = props;
  const hasData = currentRowMeta.length > 0;

  return (
    <TableBody {...bodyProps}>
      {hasData ? (
        currentRowMeta.map(
          ({ record, index, absoluteIndex, key, disabled }) => {
            const selected = selectedSet.has(key);
            const resolvedRowProps =
              typeof rowProps === "function"
                ? rowProps(record, absoluteIndex)
                : rowProps;

            return (
              <TableRow
                key={key}
                {...resolvedRowProps}
                data-selected={selected ? "" : undefined}
                className={cn(
                  striped && index % 2 === 1 && "bg-slate-50/70",
                  hoverable && "transition-colors hover:bg-blue-50/50",
                  selected && "bg-blue-50",
                  resolvedRowProps?.className,
                )}
              >
                {selectionEnabled ? (
                  <TableCell
                    className={cn(sizeCellClass[size], "w-12 text-center")}
                    style={{ textAlign: "center" }}
                  >
                    <Checkbox
                      aria-label={`选择第 ${absoluteIndex + 1} 行`}
                      checked={selected}
                      disabled={disabled}
                      onCheckedChange={(checked) =>
                        onToggleRow(key, checked === true)
                      }
                    />
                  </TableCell>
                ) : null}

                {indexColumn ? (
                  <TableCell
                    className={cn(sizeCellClass[size], "text-slate-500")}
                    style={{ textAlign: "center" }}
                  >
                    {absoluteIndex + 1}
                  </TableCell>
                ) : null}

                {visibleColumns.map((column, columnIndex) => {
                  const value = getValue(record, column.dataIndex);
                  return (
                    <TableCell
                      key={getColumnKey(column, columnIndex)}
                      sx={column.sx}
                      className={cn(sizeCellClass[size], column.className)}
                      style={{
                        width: normalizeCssSize(column.width),
                        textAlign: column.align ?? "left",
                      }}
                    >
                      {column.render
                        ? column.render(value, record, absoluteIndex)
                        : (value as React.ReactNode)}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          },
        )
      ) : (
        <TableRow>
          <TableCell
            className={cn(sizeCellClass[size], "text-center text-slate-500")}
            colSpan={Math.max(tableColumnCount, 1)}
            style={{ textAlign: "center" }}
          >
            {empty}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

export type TablePaginationFooterProps = {
  pageCount: number;
  currentPage: number;
  justifyClassName: string;
  onPageChange: (
    event: React.MouseEvent<HTMLAnchorElement>,
    page: number,
  ) => void;
};

export function TablePaginationFooter(props: TablePaginationFooterProps) {
  const { pageCount, currentPage, justifyClassName, onPageChange } = props;

  if (pageCount <= 1) return null;

  return (
    <Box className={cn("flex border-t border-slate-100 p-3", justifyClassName)}>
      <Pagination
        count={pageCount}
        page={currentPage}
        onPageChange={onPageChange}
      />
    </Box>
  );
}
