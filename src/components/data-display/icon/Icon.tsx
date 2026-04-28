import * as React from "react";
import { materialSymbolLoaders, type IconLoader } from "./loaders";

export type IconVariant = "outlined" | "rounded" | "sharp";

type SvgComponent = React.ComponentType<
  React.SVGProps<SVGSVGElement> & { title?: string }
>;

export interface IconProps {
  name?: MaterialSymbolName | (string & {});
  svg?: SvgComponent;
  src?: string;
  variant?: IconVariant;
  useColorAsFill?: boolean;
  size?: number | string;
  color?: string;
  className?: string;
  title?: string;
}

export type MaterialSymbolName = keyof typeof materialSymbolLoaders;

export type IconVariantLoaders = {
  outlined: IconLoader;
  rounded?: IconLoader;
  sharp?: IconLoader;
};

export type IconLoaderRegistry = Record<string, IconVariantLoaders>;

const userIconLoaders: IconLoaderRegistry = {};

function toIconLoaderRegistry(loaders: IconLoaderRegistry): IconLoaderRegistry {
  return { ...loaders };
}

/**
 * 合并注册图标加载器。已存在同名图标会被覆盖。
 */
export function registerIconLoaders(loaders: IconLoaderRegistry) {
  Object.assign(userIconLoaders, toIconLoaderRegistry(loaders));
}

/**
 * 全量替换已注册图标加载器。
 */
export function setIconLoaders(loaders: IconLoaderRegistry) {
  const next = toIconLoaderRegistry(loaders);
  Object.keys(userIconLoaders).forEach((key) => {
    delete userIconLoaders[key];
  });
  Object.assign(userIconLoaders, next);
}

/**
 * 清空运行时注册的图标加载器。
 */
export function resetIconLoaders() {
  Object.keys(userIconLoaders).forEach((key) => {
    delete userIconLoaders[key];
  });
}

/**
 * 获取当前可用图标名（用户注册 + 内置）。
 */
export function getRegisteredIconNames() {
  const userNames = Object.keys(userIconLoaders);
  const builtInNames = Object.keys(materialSymbolLoaders);
  return Array.from(new Set([...userNames, ...builtInNames]));
}

function EmptyIcon(props: React.SVGProps<SVGSVGElement> & { title?: string }) {
  const { title, ...restProps } = props;
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...restProps}
    >
      {title ? <title>{title}</title> : null}
    </svg>
  );
}

function resolveLoader(name: string, variant: IconVariant): IconLoader | null {
  const loaders =
    userIconLoaders[name] ??
    materialSymbolLoaders[name as MaterialSymbolName] ??
    null;
  if (!loaders) {
    return null;
  }
  if (variant === "rounded") {
    return loaders.rounded ?? loaders.outlined;
  }
  if (variant === "sharp") {
    return loaders.sharp ?? loaders.outlined;
  }
  return loaders.outlined;
}

function createLazyIcon(name: string, variant: IconVariant) {
  return React.lazy(async (): Promise<{ default: SvgComponent }> => {
    const loader = resolveLoader(name, variant);
    if (!loader) {
      return { default: EmptyIcon as SvgComponent };
    }
    try {
      const module = await loader();
      return { default: module.default as SvgComponent };
    } catch {
      return { default: EmptyIcon as SvgComponent };
    }
  });
}

/**
 * 基于 material-symbols 的 SVG 图标组件，按名称和样式变体动态加载。
 */
export function Icon(props: IconProps) {
  const {
    name,
    svg: CustomSvg,
    src,
    variant = "outlined",
    useColorAsFill = false,
    size = 24,
    color = "currentColor",
    className,
    title,
  } = props;
  const SvgIcon = React.useMemo(
    () => createLazyIcon(name ?? "", variant),
    [name, variant],
  );
  const resolvedFill = useColorAsFill ? color : "currentColor";

  if (CustomSvg) {
    return (
      <CustomSvg
        width={size}
        height={size}
        fill={resolvedFill}
        color={color}
        className={className}
        title={title}
        focusable="false"
        aria-hidden={title ? undefined : true}
      />
    );
  }

  if (src) {
    return (
      <img
        src={src}
        alt={title ?? ""}
        aria-hidden={title ? undefined : true}
        className={className}
        style={{
          display: "inline-block",
          width: size,
          height: size,
        }}
      />
    );
  }

  return (
    <React.Suspense
      fallback={
        <span
          aria-hidden="true"
          className={className}
          style={{ display: "inline-block", width: size, height: size }}
        />
      }
    >
      <SvgIcon
        width={size}
        height={size}
        fill={resolvedFill}
        color={color}
        className={className}
        title={title}
        focusable="false"
        aria-hidden={title ? undefined : true}
      />
    </React.Suspense>
  );
}

Icon.displayName = "Icon";
