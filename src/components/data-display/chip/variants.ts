import { cva, type VariantProps } from "class-variance-authority";
import {
  roundedPresetClasses,
  type Rounded,
  type RoundedPreset,
} from "../../shared/rounded";
import {
  shadowPresetClasses,
  type Shadow,
  type ShadowPreset,
} from "../../shared/shadow";

export const chipVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded border border-transparent font-medium transition-colors duration-150",
  {
    variants: {
      variant: {
        primary: "",
        success: "",
        warning: "",
        danger: "",
        minor: "",
        dark: "",
        light: "",
        text: "",
      },
      outline: {
        true: "",
        false: "",
      },
      size: {
        xs: "px-2 py-0.5 text-[10px]",
        sm: "px-2.5 py-0.5 text-xs",
        md: "px-2.5 py-1 text-xs",
        lg: "px-3 py-1 text-sm",
        xl: "px-3.5 py-1.5 text-sm",
      },
      rounded: roundedPresetClasses,
      shadow: shadowPresetClasses,
    },
    compoundVariants: [
      {
        variant: "primary",
        outline: false,
        className:
          "bg-[color:var(--ldkj-color-primary)] text-[color:var(--ldkj-color-primary-foreground)]",
      },
      {
        variant: "primary",
        outline: true,
        className:
          "border-[color:var(--ldkj-color-primary)] text-[color:var(--ldkj-color-primary)]",
      },
      {
        variant: "success",
        outline: false,
        className:
          "bg-[color:var(--ldkj-color-success)] text-[color:var(--ldkj-color-success-foreground)]",
      },
      {
        variant: "success",
        outline: true,
        className:
          "border-[color:var(--ldkj-color-success)] text-[color:var(--ldkj-color-success)]",
      },
      {
        variant: "warning",
        outline: false,
        className:
          "bg-[color:var(--ldkj-color-warning)] text-[color:var(--ldkj-color-warning-foreground)]",
      },
      {
        variant: "warning",
        outline: true,
        className:
          "border-[color:var(--ldkj-color-warning)] text-[color:var(--ldkj-color-warning)]",
      },
      {
        variant: "danger",
        outline: false,
        className:
          "bg-[color:var(--ldkj-color-danger)] text-[color:var(--ldkj-color-danger-foreground)]",
      },
      {
        variant: "danger",
        outline: true,
        className:
          "border-[color:var(--ldkj-color-danger)] text-[color:var(--ldkj-color-danger)]",
      },
      {
        variant: "minor",
        outline: false,
        className:
          "bg-[color:var(--ldkj-color-muted)] text-[color:var(--ldkj-color-muted-foreground)]",
      },
      {
        variant: "minor",
        outline: true,
        className:
          "border-[color:var(--ldkj-color-border)] text-[color:var(--ldkj-color-muted-foreground)]",
      },
      {
        variant: "dark",
        outline: false,
        className:
          "bg-[color:var(--ldkj-color-inverse)] text-[color:var(--ldkj-color-inverse-foreground)]",
      },
      {
        variant: "dark",
        outline: true,
        className:
          "border-[color:var(--ldkj-color-inverse)] text-[color:var(--ldkj-color-inverse)]",
      },
      {
        variant: "light",
        outline: false,
        className:
          "bg-[color:var(--ldkj-color-surface)] text-[color:var(--ldkj-color-surface-foreground)]",
      },
      {
        variant: "light",
        outline: true,
        className:
          "border-[color:var(--ldkj-color-surface)] text-[color:var(--ldkj-color-surface)]",
      },
      {
        variant: "text",
        outline: false,
        className:
          "bg-[color:var(--ldkj-color-surface-muted)] text-[color:var(--ldkj-color-muted-foreground)]",
      },
      {
        variant: "text",
        outline: true,
        className:
          "border-[color:var(--ldkj-color-border)] text-[color:var(--ldkj-color-muted-foreground)]",
      },
    ],
    defaultVariants: {
      variant: "primary",
      outline: false,
      size: "md",
    },
  },
);

export type ChipVariants = VariantProps<typeof chipVariants>;
export type ChipRoundedPreset = RoundedPreset;
export type ChipRounded = Rounded;
export type ChipShadowPreset = ShadowPreset;
export type ChipShadow = Shadow;
