import * as React from "react";
import type { BoxProps } from "@/components/layout/box";
import type { SxProps } from "@/styling";
import type {
  TableBody,
  TableCell,
  TableColumnDeclaration,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "./parts";

export type TableAlign = "left" | "center" | "right";
export type TableSize = "sm" | "md" | "lg";
export type TableVariant = "outlined" | "filled" | "ghost";

export type TableColumn<RecordType extends object = Record<string, unknown>> = {
  key?: React.Key;
  dataIndex?: keyof RecordType | (string & {});
  title?: React.ReactNode;
  hidden?: boolean;
  width?: number | string;
  align?: TableAlign;
  headerAlign?: TableAlign;
  className?: string;
  headerClassName?: string;
  sx?: SxProps;
  headerSx?: SxProps;
  render?: (
    value: unknown,
    record: RecordType,
    index: number,
  ) => React.ReactNode;
};

export type TableColumnProps<
  RecordType extends object = Record<string, unknown>,
> = TableColumn<RecordType>;

export type TableRowSelection<
  RecordType extends object = Record<string, unknown>,
> = {
  selectedRowKeys?: React.Key[];
  defaultSelectedRowKeys?: React.Key[];
  onChange?: (selectedRowKeys: React.Key[], selectedRows: RecordType[]) => void;
  getCheckboxProps?: (
    record: RecordType,
    index: number,
  ) => {
    disabled?: boolean;
  };
};

export type TablePaginationConfig = {
  page?: number;
  defaultPage?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number, pageSize: number) => void;
  position?: "left" | "center" | "right";
};

export type TableRowProps<RecordType extends object> =
  | BoxProps<"tr">
  | ((record: RecordType, index: number) => BoxProps<"tr">);

export type TableProps<RecordType extends object = Record<string, unknown>> =
  Omit<BoxProps<"div">, "children"> & {
    columns?: TableColumn<RecordType>[];
    dataSource?: RecordType[];
    rowKey?:
      | keyof RecordType
      | (string & {})
      | ((record: RecordType, index: number) => React.Key);
    size?: TableSize;
    variant?: TableVariant;
    striped?: boolean;
    bordered?: boolean;
    hoverable?: boolean;
    stickyHeader?: boolean;
    loading?: boolean;
    empty?: React.ReactNode;
    caption?: React.ReactNode;
    indexColumn?:
      | boolean
      | {
          title?: React.ReactNode;
          width?: number | string;
        };
    rowSelection?: TableRowSelection<RecordType>;
    pagination?: false | TablePaginationConfig;
    tableProps?: BoxProps<"table">;
    headProps?: BoxProps<"thead">;
    bodyProps?: BoxProps<"tbody">;
    rowProps?: TableRowProps<RecordType>;
    children?: React.ReactNode;
  };

export type TableCompound = {
  Column: typeof TableColumnDeclaration;
  Head: typeof TableHead;
  Body: typeof TableBody;
  Row: typeof TableRow;
  Cell: typeof TableCell;
  HeaderCell: typeof TableHeaderCell;
};

export type TableComponent = (<
  RecordType extends object = Record<string, unknown>,
>(
  props: TableProps<RecordType>,
) => React.ReactElement) &
  TableCompound;
