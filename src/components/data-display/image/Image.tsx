import * as React from "react";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

type ImageStatus = "idle" | "loading" | "loaded" | "error";

type ImageLoader = (
  src: string,
  options: {
    width?: number;
    quality?: number;
    format?: string;
    crop?: boolean;
    height?: number;
  },
) => string;

type ImageSource = {
  media?: string;
  srcSet: string;
  type?: string;
  sizes?: string;
};

export type ImageRenderState = {
  status: ImageStatus;
  loading: boolean;
  error: boolean;
  loaded: boolean;
  previewOpen: boolean;
  src?: string;
};

type ImageFormat = "webp" | "avif";

export type ImageProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "placeholder" | "children"
> & {
  class?: string;
  sx?: SxProps;
  fallback?: React.ReactNode;
  fallbackSrc?: string;
  loadingFallback?: React.ReactNode;
  fit?: React.CSSProperties["objectFit"];
  position?: React.CSSProperties["objectPosition"];
  aspectRatio?: number | string;
  placeholder?: "blur";
  blurDataURL?: string;
  retry?: number;
  retryDelay?: number;
  onLoadingChange?: (loading: boolean) => void;
  loader?: ImageLoader;
  quality?: number;
  format?: string;
  crop?: boolean;
  sources?: ImageSource[];
  formats?: ImageFormat[];
  responsiveWidths?: number[];
  preview?: boolean;
  children?: (state: ImageRenderState) => React.ReactNode;
};

function toCssSize(value: React.ImgHTMLAttributes<HTMLImageElement>["width"]) {
  if (value === undefined) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

function resolveAspectRatio(value: ImageProps["aspectRatio"]) {
  if (value === undefined) return undefined;
  return typeof value === "number" ? String(value) : value;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function withImageFormat(src: string, format: ImageFormat) {
  if (
    src.startsWith("data:") ||
    src.startsWith("blob:") ||
    src.includes("ldkj_retry=")
  ) {
    return null;
  }

  const matched = src.match(/^([^?#]+)(\?[^#]*)?(#.*)?$/);
  if (!matched) return null;

  const pathname = matched[1];
  const query = matched[2] ?? "";
  const hash = matched[3] ?? "";
  const replaced = pathname.replace(/\.(png|jpe?g|webp|avif)$/i, `.${format}`);
  if (replaced === pathname) return null;

  return `${replaced}${query}${hash}`;
}

function uniqueNumbers(values: number[]) {
  return Array.from(new Set(values.filter((value) => Number.isFinite(value) && value > 0)));
}

function appendOssResizeProcess(
  src: string,
  options: {
    width?: number;
    height?: number;
    crop?: boolean;
  },
) {
  const { width, height, crop } = options;
  if (!crop || width === undefined || height === undefined) return src;
  if (src.startsWith("data:") || src.startsWith("blob:")) return src;
  if (src.includes("x-oss-process=")) return src;
  if (src.includes("ldkj_retry=")) return src;

  const process = `x-oss-process=image/resize,m_fill,w_${width},h_${height}`;
  return `${src}${src.includes("?") ? "&" : "?"}${process}`;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  function Image(props, ref) {
    const {
      className,
      class: legacyClass,
      sx,
      style,
      fallback,
      fallbackSrc,
      loadingFallback,
      fit,
      position,
      aspectRatio,
      placeholder,
      blurDataURL,
      retry = 0,
      retryDelay = 800,
      onLoadingChange,
      loader,
      quality,
      format,
      crop = false,
      alt,
      src,
      width,
      height,
      sizes,
      loading,
      decoding,
      onLoad,
      onError,
      sources,
      formats,
      responsiveWidths,
      preview = false,
      children,
      ...rest
    } = props;
    const theme = useSxTheme();
    const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
    const [status, setStatus] = React.useState<ImageStatus>(
      src ? "loading" : "idle",
    );
    const [displaySrc, setDisplaySrc] = React.useState(src);
    const [previewOpen, setPreviewOpen] = React.useState(false);
    const [previewScale, setPreviewScale] = React.useState(1);
    const [previewOffset, setPreviewOffset] = React.useState({ x: 0, y: 0 });
    const [dragging, setDragging] = React.useState(false);
    const retryCountRef = React.useRef(0);
    const retryTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );
    const dragStartRef = React.useRef<{
      x: number;
      y: number;
      offsetX: number;
      offsetY: number;
    } | null>(null);
    const closeButtonRef = React.useRef<HTMLButtonElement | null>(null);
    const previousActiveElementRef = React.useRef<HTMLElement | null>(null);

    React.useEffect(() => {
      retryCountRef.current = 0;
      setDisplaySrc(src);
      setStatus(src ? "loading" : "idle");
      setPreviewOpen(false);
      setPreviewScale(1);
      setPreviewOffset({ x: 0, y: 0 });
      setDragging(false);
    }, [src]);

    React.useEffect(() => {
      onLoadingChange?.(status === "loading");
    }, [onLoadingChange, status]);

    React.useEffect(() => {
      if (process.env.NODE_ENV === "production") return;
      if (alt === undefined) {
        // eslint-disable-next-line no-console
        console.warn("Image missing alt prop. Use alt text or alt=\"\" for decorative images.");
      }
    }, [alt]);

    React.useEffect(() => {
      return () => {
        if (retryTimerRef.current) {
          clearTimeout(retryTimerRef.current);
        }
      };
    }, []);

    React.useEffect(() => {
      if (!previewOpen) return;
      previousActiveElementRef.current = document.activeElement as HTMLElement | null;
      closeButtonRef.current?.focus();

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setPreviewOpen(false);
          setPreviewScale(1);
          setPreviewOffset({ x: 0, y: 0 });
          setDragging(false);
          return;
        }
        if (event.key === "+" || event.key === "=") {
          setPreviewScale((prev) => clamp(Number((prev + 0.2).toFixed(2)), 1, 4));
          return;
        }
        if (event.key === "-" || event.key === "_") {
          setPreviewScale((prev) => clamp(Number((prev - 0.2).toFixed(2)), 1, 4));
          return;
        }
        if (event.key === "0") {
          setPreviewScale(1);
          setPreviewOffset({ x: 0, y: 0 });
        }
      };

      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
      return () => {
        document.body.style.overflow = previousOverflow;
        window.removeEventListener("keydown", onKeyDown);
        previousActiveElementRef.current?.focus?.();
      };
    }, [previewOpen]);

    React.useEffect(() => {
      if (!previewOpen || !dragging) return;
      const onMouseMove = (event: MouseEvent) => {
        const start = dragStartRef.current;
        if (!start) return;
        const dx = event.clientX - start.x;
        const dy = event.clientY - start.y;
        setPreviewOffset({
          x: start.offsetX + dx,
          y: start.offsetY + dy,
        });
      };
      const onMouseUp = () => {
        setDragging(false);
        dragStartRef.current = null;
      };
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };
    }, [previewOpen, dragging]);

    const loaderWidth = typeof width === "number" ? width : undefined;
    const loaderHeight = typeof height === "number" ? height : undefined;
    const finalResponsiveWidths = React.useMemo(() => {
      const base = responsiveWidths ?? [];
      const merged = loaderWidth ? [...base, loaderWidth] : base;
      return uniqueNumbers(merged).sort((a, b) => a - b);
    }, [responsiveWidths, loaderWidth]);
    const resolveSrcByLoader = React.useCallback(
      (inputSrc: string, targetFormat?: string, targetWidth?: number) => {
        if (!loader) {
          return appendOssResizeProcess(inputSrc, {
            width: targetWidth ?? loaderWidth,
            height: loaderHeight,
            crop,
          });
        }
        return loader(inputSrc, {
          width: targetWidth ?? loaderWidth,
          height: loaderHeight,
          quality,
          format: targetFormat ?? format,
          crop,
        });
      },
      [loader, loaderWidth, loaderHeight, quality, format, crop],
    );

    const resolvedSrc = displaySrc ? resolveSrcByLoader(displaySrc) : displaySrc;

    const inferredFormatSources = React.useMemo<ImageSource[]>(() => {
      if (!displaySrc || !formats?.length) return [];

      const items: ImageSource[] = [];

      for (const targetFormat of formats) {
        const converted = withImageFormat(displaySrc, targetFormat);
        if (!converted) continue;

        if (loader && finalResponsiveWidths.length) {
          const srcSet = finalResponsiveWidths
            .map((widthItem) => {
              const candidate = resolveSrcByLoader(
                converted,
                targetFormat,
                widthItem,
              );
              return `${candidate} ${widthItem}w`;
            })
            .join(", ");
          items.push({
            type: `image/${targetFormat}`,
            srcSet,
            sizes,
          });
          continue;
        }

        const resolved = resolveSrcByLoader(converted, targetFormat);
        if (!resolved || resolved === resolvedSrc) continue;
        items.push({
          type: `image/${targetFormat}`,
          srcSet: resolved,
          sizes,
        });
      }

      return items;
    }, [
      displaySrc,
      formats,
      resolveSrcByLoader,
      resolvedSrc,
      sizes,
      loader,
      finalResponsiveWidths,
    ]);

    const inferredResponsiveSource = React.useMemo<ImageSource | null>(() => {
      if (!loader || !displaySrc || !finalResponsiveWidths.length) return null;
      const srcSet = finalResponsiveWidths
        .map((widthItem) => {
          const candidate = resolveSrcByLoader(displaySrc, format, widthItem);
          return `${candidate} ${widthItem}w`;
        })
        .join(", ");
      return {
        srcSet,
        sizes,
      };
    }, [loader, displaySrc, finalResponsiveWidths, resolveSrcByLoader, format, sizes]);

    const pictureSources = React.useMemo<ImageSource[]>(() => {
      const customSources = sources ?? [];
      const items = [...customSources];
      if (inferredFormatSources.length) items.push(...inferredFormatSources);
      if (inferredResponsiveSource) items.push(inferredResponsiveSource);
      return items;
    }, [sources, inferredFormatSources, inferredResponsiveSource]);

    const showLoading = status === "loading" && loadingFallback;
    const showBlur =
      status === "loading" && placeholder === "blur" && Boolean(blurDataURL);
    const showFallback = status === "error" && fallback;
    const canPreview =
      preview && status === "loaded" && Boolean(resolvedSrc) && !showFallback;
    const renderState: ImageRenderState = {
      status,
      loading: status === "loading",
      error: status === "error",
      loaded: status === "loaded",
      previewOpen,
      src: resolvedSrc ?? undefined,
    };
    const rootStyle = mergeSxStyle(
      {
        width: toCssSize(width),
        height: aspectRatio ? undefined : toCssSize(height),
        aspectRatio: resolveAspectRatio(aspectRatio),
        backgroundImage: showBlur ? `url(${blurDataURL})` : undefined,
        backgroundSize: showBlur ? "cover" : undefined,
        backgroundPosition: showBlur ? "center" : undefined,
      },
      style,
      sxInlineStyle,
    );
    const imageStyle: React.CSSProperties = {
      width: "100%",
      height: aspectRatio || height !== undefined ? "100%" : "auto",
      objectFit: fit,
      objectPosition: position,
      opacity: showBlur ? 0 : undefined,
      transition: showBlur ? "opacity 180ms ease" : undefined,
      cursor: canPreview ? "zoom-in" : undefined,
    };
    const previewImageStyle: React.CSSProperties = {
      transform: `translate(${previewOffset.x}px, ${previewOffset.y}px) scale(${previewScale})`,
      transition: dragging ? undefined : "transform 120ms ease",
      cursor: previewScale > 1 ? (dragging ? "grabbing" : "grab") : "zoom-in",
      transformOrigin: "center center",
    };

    const handleError: React.ReactEventHandler<HTMLImageElement> = (event) => {
      if (retryCountRef.current < retry && displaySrc) {
        retryCountRef.current += 1;
        retryTimerRef.current = setTimeout(() => {
          const separator = displaySrc.includes("?") ? "&" : "?";
          setDisplaySrc(
            `${displaySrc}${separator}ldkj_retry=${retryCountRef.current}`,
          );
          setStatus("loading");
        }, retryDelay);
        onError?.(event);
        return;
      }

      if (fallbackSrc && displaySrc !== fallbackSrc) {
        setDisplaySrc(fallbackSrc);
        setStatus("loading");
        onError?.(event);
        return;
      }

      setStatus("error");
      onError?.(event);
    };

    const closePreview = React.useCallback(() => {
      setPreviewOpen(false);
      setPreviewScale(1);
      setPreviewOffset({ x: 0, y: 0 });
      setDragging(false);
    }, []);

    const handlePreviewWheel: React.WheelEventHandler<HTMLSpanElement> = (
      event,
    ) => {
      event.preventDefault();
      event.stopPropagation();
      const delta = event.deltaY < 0 ? 0.2 : -0.2;
      setPreviewScale((prev) => clamp(Number((prev + delta).toFixed(2)), 1, 4));
    };

    return (
      <>
        <span
          className={cn(
            "relative inline-block max-w-full overflow-hidden align-middle",
            sxClassName,
            className,
            legacyClass,
          )}
          style={rootStyle}
        >
          {showFallback ? fallback : pictureSources.length ? (
            <picture>
              {pictureSources.map((source, index) => (
                <source
                  key={`${source.type ?? "source"}-${index}`}
                  media={source.media}
                  srcSet={source.srcSet}
                  type={source.type}
                  sizes={source.sizes}
                />
              ))}
              <img
                ref={ref}
                alt={alt}
                src={resolvedSrc}
                width={width}
                height={height}
                sizes={sizes}
                loading={loading ?? "lazy"}
                decoding={decoding ?? "async"}
                onLoad={(event) => {
                  setStatus("loaded");
                  onLoad?.(event);
                }}
                onError={handleError}
                onClick={() => {
                  if (canPreview) {
                    setPreviewOpen(true);
                    setPreviewScale(1);
                    setPreviewOffset({ x: 0, y: 0 });
                  }
                }}
                className="block max-w-full"
                style={imageStyle}
                {...rest}
              />
            </picture>
          ) : (
            <img
              ref={ref}
              alt={alt}
              src={resolvedSrc}
              width={width}
              height={height}
              sizes={sizes}
              loading={loading ?? "lazy"}
              decoding={decoding ?? "async"}
              onLoad={(event) => {
                setStatus("loaded");
                onLoad?.(event);
              }}
              onError={handleError}
              onClick={() => {
                if (canPreview) {
                  setPreviewOpen(true);
                  setPreviewScale(1);
                  setPreviewOffset({ x: 0, y: 0 });
                }
              }}
              className="block max-w-full"
              style={imageStyle}
              {...rest}
            />
          )}

          {showLoading ? (
            <span className="absolute inset-0 flex items-center justify-center">
              {loadingFallback}
            </span>
          ) : null}
          {children ? (
            <span className="pointer-events-none absolute inset-0">
              {children(renderState)}
            </span>
          ) : null}
        </span>

        {previewOpen && resolvedSrc ? (
          <span
            className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/80 p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
            onClick={closePreview}
            onWheel={handlePreviewWheel}
          >
            <img
              src={resolvedSrc}
              alt={alt}
              className="max-h-[88vh] max-w-[92vw] select-none rounded-md object-contain shadow-2xl"
              style={previewImageStyle}
              onClick={(event) => event.stopPropagation()}
              onMouseDown={(event) => {
                if (previewScale <= 1) return;
                event.preventDefault();
                event.stopPropagation();
                dragStartRef.current = {
                  x: event.clientX,
                  y: event.clientY,
                  offsetX: previewOffset.x,
                  offsetY: previewOffset.y,
                };
                setDragging(true);
              }}
            />
            <span className="absolute right-5 top-5 flex items-center gap-2">
              <button
                type="button"
                className="rounded-md bg-white/90 px-2.5 py-1.5 text-xs font-medium text-slate-800 hover:bg-white"
                onClick={(event) => {
                  event.stopPropagation();
                  setPreviewScale((prev) => clamp(prev - 0.2, 1, 4));
                }}
              >
                -
              </button>
              <button
                type="button"
                className="rounded-md bg-white/90 px-2.5 py-1.5 text-xs font-medium text-slate-800 hover:bg-white"
                onClick={(event) => {
                  event.stopPropagation();
                  setPreviewScale((prev) => clamp(prev + 0.2, 1, 4));
                }}
              >
                +
              </button>
              <button
                type="button"
                className="rounded-md bg-white/90 px-2.5 py-1.5 text-xs font-medium text-slate-800 hover:bg-white"
                onClick={(event) => {
                  event.stopPropagation();
                  setPreviewScale(1);
                  setPreviewOffset({ x: 0, y: 0 });
                }}
              >
                重置
              </button>
              <button
                ref={closeButtonRef}
                type="button"
                className="rounded-md bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-800 hover:bg-white"
                aria-label="Close preview"
                onClick={(event) => {
                  event.stopPropagation();
                  closePreview();
                }}
              >
                关闭
              </button>
            </span>
          </span>
        ) : null}
      </>
    );
  },
);

Image.displayName = "Image";
