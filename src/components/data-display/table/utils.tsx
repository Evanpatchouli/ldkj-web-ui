import * as React from "react";
import {
  TableColumnDeclaration,
} from "./parts";
import type { TableColumn, TableColumnProps, TableProps } from "./types";

export function normalizeCssSize(value: number | string | undefined) {
  if (typeof value === "number") return `${value}px`;
  return value;
}

export function getValue<RecordType extends object>(
  record: RecordType,
  dataIndex: TableColumn<RecordType>["dataIndex"],
) {
  if (!dataIndex) return undefined;
  return (record as Record<string, unknown>)[String(dataIndex)];
}

export function getColumnKey<RecordType extends object>(
  column: TableColumn<RecordType>,
  index: number,
) {
  if (column.key !== undefined) return column.key;
  if (column.dataIndex !== undefined) return String(column.dataIndex);
  return index;
}

export function getRowKey<RecordType extends object>(
  record: RecordType,
  index: number,
  rowKey: TableProps<RecordType>["rowKey"],
) {
  if (typeof rowKey === "function") return rowKey(record, index);
  if (rowKey) {
    const value = (record as Record<string, unknown>)[String(rowKey)];
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "bigint"
    ) {
      return value;
    }
  }
  const fallback = (record as Record<string, unknown>).key;
  if (
    typeof fallback === "string" ||
    typeof fallback === "number" ||
    typeof fallback === "bigint"
  ) {
    return fallback;
  }
  return index;
}

export function getAutoColumns<RecordType extends object>(
  dataSource: RecordType[],
): TableColumn<RecordType>[] {
  const firstRecord = dataSource[0];
  if (!firstRecord) return [];
  return Object.keys(firstRecord).map((key) => ({
    key,
    dataIndex: key,
    title: key,
  }));
}

function isTableColumnElement(
  child: React.ReactNode,
): child is React.ReactElement<TableColumnProps> {
  return React.isValidElement(child) && child.type === TableColumnDeclaration;
}

export function resolveChildrenColumns<RecordType extends object>(
  children: React.ReactNode,
) {
  const childColumns: TableColumn<RecordType>[] = [];
  const restChildren: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (isTableColumnElement(child)) {
      childColumns.push(child.props as TableColumn<RecordType>);
      return;
    }
    restChildren.push(child);
  });

  return {
    childColumns,
    restChildren,
  };
}

export function useControllableKeys(props: {
  selectedRowKeys?: React.Key[];
  defaultSelectedRowKeys?: React.Key[];
}) {
  const { selectedRowKeys, defaultSelectedRowKeys = [] } = props;
  const [innerKeys, setInnerKeys] = React.useState<React.Key[]>(
    defaultSelectedRowKeys,
  );
  const isControlled = selectedRowKeys !== undefined;
  return {
    selectedKeys: isControlled ? selectedRowKeys : innerKeys,
    setSelectedKeys: setInnerKeys,
    isControlled,
  };
}
