import { cva, type VariantProps } from "class-variance-authority";

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
    },
    compoundVariants: [
      {
        variant: "primary",
        outline: false,
        className: "bg-blue-600 text-white",
      },
      {
        variant: "primary",
        outline: true,
        className: "border-blue-600 text-blue-600",
      },
      {
        variant: "success",
        outline: false,
        className: "bg-green-600 text-white",
      },
      {
        variant: "success",
        outline: true,
        className: "border-green-600 text-green-600",
      },
      {
        variant: "warning",
        outline: false,
        className: "bg-yellow-500 text-white",
      },
      {
        variant: "warning",
        outline: true,
        className: "border-yellow-500 text-yellow-600",
      },
      {
        variant: "danger",
        outline: false,
        className: "bg-red-600 text-white",
      },
      {
        variant: "danger",
        outline: true,
        className: "border-red-600 text-red-600",
      },
      {
        variant: "minor",
        outline: false,
        className: "bg-gray-200 text-gray-700",
      },
      {
        variant: "minor",
        outline: true,
        className: "border-gray-300 text-gray-600",
      },
      {
        variant: "dark",
        outline: false,
        className: "bg-black/90 text-white",
      },
      {
        variant: "dark",
        outline: true,
        className: "border-black/90 text-black/90",
      },
      {
        variant: "light",
        outline: false,
        className: "bg-white text-gray-900",
      },
      {
        variant: "light",
        outline: true,
        className: "border-white text-white",
      },
      {
        variant: "text",
        outline: false,
        className: "bg-gray-100 text-gray-600",
      },
      {
        variant: "text",
        outline: true,
        className: "border-gray-300 text-gray-500",
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
