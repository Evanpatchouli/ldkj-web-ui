import type { CSSProperties } from "react";

export const shadowPresetClasses = {
  none: "shadow-none",
  xs: "shadow-[0_1px_2px_rgba(15,23,42,0.08)]",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  inner: "shadow-inner",
} as const;

export type ShadowPreset = keyof typeof shadowPresetClasses;
export type Shadow = ShadowPreset | string;

function isShadowPreset(value: unknown): value is ShadowPreset {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(shadowPresetClasses, value)
  );
}

export function resolveShadow(shadow?: Shadow): {
  shadowPreset?: ShadowPreset;
  shadowStyle?: CSSProperties;
} {
  if (shadow === undefined) return {};

  if (isShadowPreset(shadow)) {
    return {
      shadowPreset: shadow,
    };
  }

  return {
    shadowStyle: {
      boxShadow: shadow,
    },
  };
}
