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

export const buttonVariants = cva(
  "box-border inline-flex appearance-none cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border border-solid border-transparent p-0 font-sans text-sm font-medium ring-offset-background transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        dark:
          "bg-[color:var(--ldkj-color-inverse)] text-[color:var(--ldkj-color-inverse-foreground)] hover:bg-[color:var(--ldkj-color-inverse)]",
        primary:
          "bg-[color:var(--ldkj-color-primary)] text-[color:var(--ldkj-color-primary-foreground)] hover:bg-[color:var(--ldkj-color-primary-hover)]",
        secondary:
          "bg-[color:var(--ldkj-color-secondary)] text-[color:var(--ldkj-color-secondary-foreground)] hover:bg-[color:var(--ldkj-color-secondary-hover)]",
        minor:
          "bg-[color:var(--ldkj-color-muted)] text-[color:var(--ldkj-color-muted-foreground)] hover:bg-[color:var(--ldkj-color-accent-hover)]",
        success:
          "bg-[color:var(--ldkj-color-success)] text-[color:var(--ldkj-color-success-foreground)] hover:brightness-95",
        warning:
          "bg-[color:var(--ldkj-color-warning)] text-[color:var(--ldkj-color-warning-foreground)] hover:brightness-95",
        danger:
          "bg-[color:var(--ldkj-color-danger)] text-[color:var(--ldkj-color-danger-foreground)] hover:brightness-95",
        outline:
          "border border-solid border-[color:var(--ldkj-color-primary)] bg-[color:var(--ldkj-color-background)] text-[color:var(--ldkj-color-primary)] hover:border-[color:var(--ldkj-color-primary-hover)] hover:text-[color:var(--ldkj-color-primary-hover)]",
        ghost:
          "bg-transparent text-[color:var(--ldkj-color-foreground)] hover:bg-[color:var(--ldkj-color-accent)] hover:text-[color:var(--ldkj-color-accent-foreground)]",
        link:
          "bg-transparent text-[color:var(--ldkj-color-primary)] underline-offset-4 hover:text-[color:var(--ldkj-color-primary-hover)] hover:underline",
        text: "bg-transparent text-[color:var(--ldkj-color-foreground)]",
      },
      size: {
        xs: "h-6 text-[10px] px-2",
        sm: "h-7 text-xs px-3",
        md: "h-8 text-sm px-4",
        lg: "h-9 text-lg px-8",
        xl: "h-10 text-lg px-10",
        icon: "h-8 w-8",
      },
      rounded: roundedPresetClasses,
      shadow: shadowPresetClasses,
      bounce: {
        true: "transition-all ease-out active:-translate-y-[10%] active:scale-98",
      },
      splash: {
        true: "active:opacity-90",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      bounce: false,
      splash: false,
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
export type ButtonRoundedPreset = RoundedPreset;
export type ButtonRounded = Rounded;
export type ButtonShadowPreset = ShadowPreset;
export type ButtonShadow = Shadow;
