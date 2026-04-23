import { QRCodeCanvas, type QRCodeCanvasProps } from "./QRCodeCanvas";
import { QRCodeSizable, type QRCodeSizableProps } from "./QRCodeSizable";

export type QRCodeProps =
  | ({
      canvas: true;
    } & QRCodeCanvasProps)
  | ({
      canvas?: false;
    } & QRCodeSizableProps);

/**
 * 渲染二维码组件
 * - `canvas: true` -> QRCodeCanvas rendered with canvas
 * - `canvas: false` -> QRCodeSizable rendered with image
 * - `value: string` -> the value to be displayed in the QR code
 * - `size: number|string` -> the size of the QR code
 * - `fullWidth: boolean` -> whether to fill the parent container
 */
export default function QRCode({ canvas, ...props }: QRCodeProps) {
  return canvas ? <QRCodeCanvas {...props} /> : <QRCodeSizable {...props} />;
}
