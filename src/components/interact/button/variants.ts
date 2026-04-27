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
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        dark: "bg-black/90 text-primary-foreground hover:bg-black",
        primary: "bg-blue-600 text-primary-foreground hover:bg-blue-600/90",
        secondary: "bg-cyan-600 text-primary-foreground hover:bg-cyan-600/90",
        minor: "bg-gray-200 text-secondary-foreground hover:bg-gray-300/90",
        success: "bg-green-600 text-primary-foreground hover:bg-green-600/90",
        warning: "bg-yellow-600 text-primary-foreground hover:bg-yellow-600/90",
        danger:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-solid border-blue-600 bg-background text-blue-600 hover:text-blue-600/80 hover:border-blue-600/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-blue-600 underline-offset-4 hover:underline hover:text-blue-600/90",
        text: "text-foreground",
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
