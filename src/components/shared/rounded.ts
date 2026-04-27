import type { CSSProperties } from "react";

export const roundedPresetClasses = {
  xs: "rounded-[2px]",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
} as const;

export type RoundedPreset = keyof typeof roundedPresetClasses;
export type Rounded = RoundedPreset | number | string;

function isRoundedPreset(value: unknown): value is RoundedPreset {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(roundedPresetClasses, value)
  );
}

export function resolveRounded(rounded?: Rounded): {
  roundedPreset?: RoundedPreset;
  roundedStyle?: CSSProperties;
} {
  if (rounded === undefined) return {};

  if (typeof rounded === "number") {
    return {
      roundedStyle: {
        borderRadius: `${rounded}px`,
      },
    };
  }

  if (isRoundedPreset(rounded)) {
    return {
      roundedPreset: rounded,
    };
  }

  return {
    roundedStyle: {
      borderRadius: rounded,
    },
  };
}
