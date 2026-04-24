import React, { useState, useEffect, useRef } from "react";
import qrcode from "qrcode";
import { CSSUnitConverter, cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

export interface QRCodeSizableProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * - 二维码尺寸
   * - 默认：`200`
   */
  size?: number | string;
  value: string;
  useful?: boolean;
  uselessElem?: React.ReactNode;
  uselessProps?: React.HTMLAttributes<HTMLDivElement>;
  /**
   * - 前景色
   * - 默认："#000000"
   */
  foregroundColor?: string;
  /**
   * - 背景色
   * - 默认："#ffffff"
   */
  backgroundColor?: string;
  /**
   * - 二维码四周的留白（单位是 px）
   * - 默认：`4`（qrcode 不设置 margin 默认值是 4）
   */
  margin?: number;
  /**
   * - 二维码识别容错率（部分区域被遮挡仍可识别）
   * - `low`：7% 或更少
   * - `medium`：15% 或更少
   * - `quartile`：25% 或更少
   * - `high`：30% 或更少，二维码中间放 logo 图像时推荐
   */
  errorCorrectionLevel?: "low" | "medium" | "quartile" | "high";
  unload?: React.ReactNode;
  fullWidth?: boolean;
  sx?: SxProps;
}

const ifSize = (size: QRCodeSizableProps["size"]) =>
  size ? { width: size, height: size } : {};

export const QRCodeSizable: React.FC<QRCodeSizableProps> = ({
  size = 200,
  fullWidth,
  sx,
  value,
  useful = true,
  uselessElem,
  uselessProps: { style: uselessStyle = {}, ...uselessProps } = {},
  alt,
  style,
  className,
  foregroundColor,
  backgroundColor,
  margin = 4,
  errorCorrectionLevel,
  unload,
  width,
  height,
  ...rest
}) => {
  const [src, setSrc] = useState("");
  const [containerSize, setContainerSize] = useState<number>();
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

  useEffect(() => {
    if (!fullWidth) return;
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      setContainerSize(Math.min(container.clientWidth, container.clientHeight));
    };

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [fullWidth]);

  useEffect(() => {
    const qrWidth = fullWidth
      ? containerSize
      : width
        ? CSSUnitConverter.getInstance().convertToPx(width)
        : size
          ? CSSUnitConverter.getInstance().convertToPx(size)
          : void 0;

    qrcode
      .toDataURL(value, {
        color: {
          dark: foregroundColor,
          light: backgroundColor,
        },
        width: qrWidth,
        margin,
        errorCorrectionLevel,
      })
      .then((url) => setSrc(url))
      .catch((err) => console.error(err));
  }, [
    backgroundColor,
    errorCorrectionLevel,
    foregroundColor,
    margin,
    fullWidth,
    containerSize,
    width,
    size,
    value,
  ]);

  return src ? (
    <div
      ref={containerRef}
      style={{
        width: fullWidth ? "100%" : size,
        height: fullWidth ? "100%" : size,
        display: "flex",
        aspectRatio: "1",
        position: "relative",
      }}
    >
      <img
        src={src}
        alt={alt ?? "QR Code"}
        className={cn(sxClassName, className)}
        style={mergeSxStyle(
          {
            filter: useful ? "none" : "grayscale(100%) opacity(0.5)",
            transition: "filter 0.2s ease",
            position: "relative",
            ...(fullWidth ? { width: "100%", height: "100%" } : ifSize(size)),
          },
          style,
          sxInlineStyle,
        )}
        {...(!fullWidth && { width, height })}
        {...rest}
      />
      {!useful && uselessElem && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            background:
              "radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 80%)",
            opacity: 0.5,
            ...uselessStyle,
          }}
          {...uselessProps}
        >
          {uselessElem}
        </div>
      )}
    </div>
  ) : (
    <>{unload}</>
  );
};
