import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";
import {
  resolveRounded,
  roundedPresetClasses,
  type Rounded,
} from "@/components/shared/rounded";
import {
  resolveShadow,
  shadowPresetClasses,
  type Shadow,
} from "@/components/shared/shadow";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | number | string;

const avatarSizeClass: Record<Exclude<AvatarSize, number | string>, string> = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

function toCssSize(size: AvatarSize | undefined) {
  if (size === undefined) return undefined;
  if (typeof size === "number") return `${size}px`;
  if (typeof size === "string" && size in avatarSizeClass) return undefined;
  return size;
}

export type AvatarProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
  class?: string;
  sx?: SxProps;
  size?: AvatarSize;
  rounded?: Rounded;
  shadow?: Shadow;
};

export type AvatarImageProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> & {
  class?: string;
  sx?: SxProps;
};

export type AvatarFallbackProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
  class?: string;
  sx?: SxProps;
};

const AvatarRoot = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>((props, ref) => {
  const {
    className,
    class: legacyClass,
    sx,
    style,
    size = "md",
    rounded = "full",
    shadow,
    ...restProps
  } = props;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const { roundedPreset, roundedStyle } = resolveRounded(rounded);
  const { shadowPreset, shadowStyle } = resolveShadow(shadow);
  const sizeStyle = toCssSize(size);

  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        "avatar relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden bg-slate-100 text-slate-700",
        typeof size === "string"
          ? avatarSizeClass[size as keyof typeof avatarSizeClass]
          : null,
        roundedPreset ? roundedPresetClasses[roundedPreset] : null,
        shadowPreset ? shadowPresetClasses[shadowPreset] : null,
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(
        style,
        roundedStyle,
        shadowStyle,
        sizeStyle ? { width: sizeStyle, height: sizeStyle } : undefined,
        sxInlineStyle,
      )}
      {...restProps}
    />
  );
});

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>((props, ref) => {
  const { className, class: legacyClass, sx, style, ...restProps } = props;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn(
        "avatar-image h-full w-full object-cover",
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(style, sxInlineStyle)}
      {...restProps}
    />
  );
});

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>((props, ref) => {
  const { className, class: legacyClass, sx, style, ...restProps } = props;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "avatar-fallback flex h-full w-full items-center justify-center bg-slate-100 font-medium text-slate-600",
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(style, sxInlineStyle)}
      {...restProps}
    />
  );
});

type AvatarComponent = typeof AvatarRoot & {
  Image: typeof AvatarImage;
  Fallback: typeof AvatarFallback;
};

export const Avatar = Object.assign(AvatarRoot, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
}) as AvatarComponent;

AvatarRoot.displayName = "Avatar";
AvatarImage.displayName = "Avatar.Image";
AvatarFallback.displayName = "Avatar.Fallback";
Avatar.displayName = "Avatar";

export { AvatarImage, AvatarFallback };
