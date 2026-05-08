import { Box, type BoxProps } from "@/components/layout/box";
import { cn } from "@/lib/utils";
import { mergeSxStyle } from "@/styling";
import type { TableColumnProps } from "./types";

export function TableColumnDeclaration<
  RecordType extends object = Record<string, unknown>,
>(_: TableColumnProps<RecordType>) {
  return null;
}

export function TableHead(props: BoxProps<"thead">) {
  const { className, ...restProps } = props;
  return (
    <Box
      component="thead"
      className={cn("bg-slate-50", className)}
      {...restProps}
    />
  );
}

export function TableBody(props: BoxProps<"tbody">) {
  return <Box component="tbody" {...props} />;
}

export function TableRow(props: BoxProps<"tr">) {
  const { className, ...restProps } = props;
  return (
    <Box
      component="tr"
      className={cn("border-b border-slate-100 last:border-b-0", className)}
      {...restProps}
    />
  );
}

export function TableHeaderCell(props: BoxProps<"th">) {
  const { className, style, ...restProps } = props;
  return (
    <Box
      component="th"
      scope="col"
      className={cn("whitespace-nowrap font-medium text-slate-700", className)}
      style={mergeSxStyle({ textAlign: "left" }, style)}
      {...restProps}
    />
  );
}

export function TableCell(props: BoxProps<"td">) {
  const { className, style, ...restProps } = props;
  return (
    <Box
      component="td"
      className={cn("text-slate-700", className)}
      style={mergeSxStyle({ textAlign: "left" }, style)}
      {...restProps}
    />
  );
}
