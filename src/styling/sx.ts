import { css } from "@emotion/css";
import type { CSSObject } from "@emotion/serialize";
import type * as React from "react";
import type { SxTheme } from "./theme";

export type SxObject = CSSObject;

export type SxProps<TTheme extends SxTheme = SxTheme> =
  | SxObject
  | ReadonlyArray<SxProps<TTheme>>
  | ((theme: TTheme) => SxProps<TTheme>)
  | false
  | null
  | undefined;

type FlatSxObject = CSSObject;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function flattenSx<TTheme extends SxTheme>(
  sx: SxProps<TTheme>,
  theme: TTheme,
  out: FlatSxObject[],
): void {
  if (!sx) return;

  if (typeof sx === "function") {
    flattenSx(sx(theme), theme, out);
    return;
  }

  if (Array.isArray(sx)) {
    for (const item of sx) {
      flattenSx(item, theme, out);
    }
    return;
  }

  if (isObject(sx)) {
    out.push(sx as FlatSxObject);
  }
}

function shouldKeepAsInlineStyle(key: string, value: unknown) {
  if (value === undefined || value === null) return false;
  if (typeof value === "object") return false;
  if (Array.isArray(value)) return false;
  if (key.startsWith("@")) return false;
  if (
    key.includes("&") ||
    key.includes(":") ||
    key.includes(" ") ||
    key.includes(">") ||
    key.includes("+") ||
    key.includes("~") ||
    key.includes("[") ||
    key.includes(".") ||
    key.includes("#")
  ) {
    return false;
  }
  return true;
}

function pickInlineStyleFromSxObject(
  sxObject: FlatSxObject,
): React.CSSProperties {
  const style: React.CSSProperties = {};

  for (const [key, value] of Object.entries(sxObject)) {
    if (!shouldKeepAsInlineStyle(key, value)) continue;
    (style as Record<string, unknown>)[key] = value;
  }

  return style;
}

export function resolveSx<TTheme extends SxTheme = SxTheme>(
  sx: SxProps<TTheme>,
  theme: TTheme,
) {
  const sxObjects: FlatSxObject[] = [];
  flattenSx(sx, theme, sxObjects);

  if (!sxObjects.length) {
    return {
      sxClassName: undefined,
      sxInlineStyle: undefined,
    };
  }

  const sxClassName = css(sxObjects);
  const sxInlineStyle = sxObjects.reduce<React.CSSProperties>(
    (acc, item) => ({
      ...acc,
      ...pickInlineStyleFromSxObject(item),
    }),
    {},
  );

  return {
    sxClassName,
    sxInlineStyle,
  };
}

export function mergeSxStyle(
  ...styles: Array<React.CSSProperties | undefined>
): React.CSSProperties | undefined {
  const merged = styles.reduce<React.CSSProperties>(
    (acc, item) => (item ? { ...acc, ...item } : acc),
    {},
  );
  return Object.keys(merged).length ? merged : undefined;
}
