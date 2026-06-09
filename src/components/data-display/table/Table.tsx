import * as React from "react";
import { Box } from "@/components/layout/box";
import { cn } from "@/lib/utils";
import { mergeSxStyle } from "@/styling";
import { variantRootClass } from "./constants";
import {
  TableBody,
  TableCell,
  TableColumnDeclaration,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "./parts";
import {
  TableBodyRows,
  TableHeaderRows,
  TablePaginationFooter,
} from "./sections";
import type { TableComponent, TableProps } from "./types";
import {
  getAutoColumns,
  getColumnKey,
  getRowKey,
  normalizeCssSize,
  resolveChildrenColumns,
  useControllableKeys,
} from "./utils";

function TableRoot<RecordType extends object = Record<string, unknown>>(
  props: TableProps<RecordType>,
) {
  const {
    columns,
    dataSource = [],
    rowKey = "id",
    size = "md",
    variant = "outlined",
    striped = false,
    bordered = false,
    hoverable = true,
    stickyHeader = false,
    loading = false,
    empty = "暂无数据",
    caption,
    indexColumn = false,
    rowSelection,
    pagination,
    tableProps,
    headProps,
    bodyProps,
    rowProps,
    className,
    children,
    rounded = "lg",
    ...rootProps
  } = props;
  const { childColumns, restChildren } =
    resolveChildrenColumns<RecordType>(children);
  const resolvedColumns =
    columns ?? (childColumns.length ? childColumns : getAutoColumns(dataSource));
  const visibleColumns = resolvedColumns.filter((column) => !column.hidden);
  const pageSize =
    pagination === false
      ? dataSource.length || 1
      : (pagination?.pageSize ?? (dataSource.length || 1));
  const paginationTotal =
    pagination === false
      ? dataSource.length
      : (pagination?.total ?? dataSource.length);
  const pageCount = Math.max(Math.ceil(paginationTotal / pageSize), 1);
  const [innerPage, setInnerPage] = React.useState(
    pagination === false ? 1 : (pagination?.defaultPage ?? 1),
  );
  const currentPage =
    pagination === false ? 1 : (pagination?.page ?? innerPage);
  const pageStart = (currentPage - 1) * pageSize;
  const currentData =
    pagination === false
      ? dataSource
      : dataSource.slice(pageStart, pageStart + pageSize);
  const selectionEnabled = Boolean(rowSelection);
  const { selectedKeys, setSelectedKeys, isControlled } = useControllableKeys({
    selectedRowKeys: rowSelection?.selectedRowKeys,
    defaultSelectedRowKeys: rowSelection?.defaultSelectedRowKeys,
  });
  const currentRowMeta = currentData.map((record, index) => {
    const absoluteIndex = pageStart + index;
    const key = getRowKey(record, absoluteIndex, rowKey);
    const checkboxProps = rowSelection?.getCheckboxProps?.(
      record,
      absoluteIndex,
    );
    return {
      record,
      index,
      absoluteIndex,
      key,
      disabled: Boolean(checkboxProps?.disabled),
    };
  });
  const selectableKeys = currentRowMeta
    .filter((item) => !item.disabled)
    .map((item) => item.key);
  const selectedSet = new Set(selectedKeys);
  const checkedCount = selectableKeys.filter((key) =>
    selectedSet.has(key),
  ).length;
  const allChecked =
    selectableKeys.length > 0 && checkedCount === selectableKeys.length;
  const partiallyChecked = checkedCount > 0 && !allChecked;
  const paginationJustify =
    pagination !== false && pagination?.position === "left"
      ? "justify-start"
      : pagination !== false && pagination?.position === "center"
        ? "justify-center"
        : "justify-end";
  const tableColumnCount =
    visibleColumns.length + (selectionEnabled ? 1 : 0) + (indexColumn ? 1 : 0);
  const indexColumnWidth = normalizeCssSize(
    typeof indexColumn === "object" ? indexColumn.width : 64,
  );

  function emitSelection(nextKeys: React.Key[]) {
    if (!isControlled) {
      setSelectedKeys(nextKeys);
    }
    const nextSet = new Set(nextKeys);
    rowSelection?.onChange?.(
      nextKeys,
      dataSource.filter((record, index) =>
        nextSet.has(getRowKey(record, index, rowKey)),
      ),
    );
  }

  function toggleRow(key: React.Key, checked: boolean) {
    const nextSet = new Set(selectedKeys);
    if (checked) {
      nextSet.add(key);
    } else {
      nextSet.delete(key);
    }
    emitSelection(Array.from(nextSet));
  }

  function toggleCurrentPage(checked: boolean) {
    const nextSet = new Set(selectedKeys);
    selectableKeys.forEach((key) => {
      if (checked) {
        nextSet.add(key);
      } else {
        nextSet.delete(key);
      }
    });
    emitSelection(Array.from(nextSet));
  }

  function handlePageChange(
    _: React.MouseEvent<HTMLAnchorElement>,
    page: number,
  ) {
    if (pagination !== false && pagination?.page === undefined) {
      setInnerPage(page);
    }
    pagination !== false && pagination?.onPageChange?.(page, pageSize);
  }

  return (
    <Box
      rounded={rounded}
      loading={loading}
      className={cn(
        "table-root w-full overflow-hidden",
        variantRootClass[variant],
        className,
      )}
      {...rootProps}
    >
      <Box className="table-scroll w-full overflow-x-auto">
        <Box
          component="table"
          {...tableProps}
          className={cn(
            "table w-full table-fixed border-collapse text-left",
            bordered &&
              "[&_td]:border-r [&_td]:border-[color:var(--ldkj-color-border)] [&_td:last-child]:border-r-0 [&_th]:border-r [&_th]:border-[color:var(--ldkj-color-border)] [&_th:last-child]:border-r-0",
            tableProps?.className,
          )}
          style={mergeSxStyle(
            {
              borderCollapse: "collapse",
              display: "table",
              tableLayout: "fixed",
              width: "100%",
            },
            tableProps?.style,
          )}
        >
          {tableColumnCount > 0 ? (
            <colgroup>
              {selectionEnabled ? <col style={{ width: 48 }} /> : null}
              {indexColumn ? <col style={{ width: indexColumnWidth }} /> : null}
              {visibleColumns.map((column, columnIndex) => (
                <col
                  key={getColumnKey(column, columnIndex)}
                  style={{ width: normalizeCssSize(column.width) }}
                />
              ))}
            </colgroup>
          ) : null}

          {caption ? (
            <caption className="px-4 py-3 text-left text-sm text-[color:var(--ldkj-color-muted-foreground)]">
              {caption}
            </caption>
          ) : null}

          <TableHead
            {...headProps}
            className={cn(
              stickyHeader && "sticky top-0 z-10",
              headProps?.className,
            )}
          >
            <TableHeaderRows
              selectionEnabled={selectionEnabled}
              size={size}
              allChecked={allChecked}
              partiallyChecked={partiallyChecked}
              selectableKeysLength={selectableKeys.length}
              onToggleCurrentPage={toggleCurrentPage}
              indexColumn={indexColumn}
              visibleColumns={visibleColumns}
            />
          </TableHead>

          <TableBodyRows
            bodyProps={bodyProps}
            currentRowMeta={currentRowMeta}
            selectedSet={selectedSet}
            rowProps={rowProps}
            size={size}
            striped={striped}
            hoverable={hoverable}
            selectionEnabled={selectionEnabled}
            onToggleRow={toggleRow}
            indexColumn={indexColumn}
            visibleColumns={visibleColumns}
            empty={empty}
            tableColumnCount={tableColumnCount}
          />
        </Box>
      </Box>

      {pagination !== false && pageCount > 1 ? (
        <TablePaginationFooter
          pageCount={pageCount}
          currentPage={currentPage}
          justifyClassName={paginationJustify}
          onPageChange={handlePageChange}
        />
      ) : null}

      {restChildren}
    </Box>
  );
}

export const Table = Object.assign(TableRoot, {
  Column: TableColumnDeclaration,
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  HeaderCell: TableHeaderCell,
}) as TableComponent;

(Table as unknown as { displayName: string }).displayName = "Table";
(Table.Column as unknown as { displayName: string }).displayName =
  "Table.Column";
(Table.Head as unknown as { displayName: string }).displayName = "Table.Head";
(Table.Body as unknown as { displayName: string }).displayName = "Table.Body";
(Table.Row as unknown as { displayName: string }).displayName = "Table.Row";
(Table.Cell as unknown as { displayName: string }).displayName = "Table.Cell";
(Table.HeaderCell as unknown as { displayName: string }).displayName =
  "Table.HeaderCell";
