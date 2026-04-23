import React, { useState, useEffect } from 'react'
import qrcode from 'qrcode'

interface QRCodeBaseProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number
  value: string
  useful?: boolean
  /**
   * - 前景色
   * - 默认："#000000"
   */
  foregroundColor?: string
  /**
   * - 背景色
   * - 默认："#ffffff"
   */
  backgroundColor?: string
  /**
   * - 二维码四周的留白（单位是 px）
   * - 默认：`0`
   */
  margin?: number
  /**
   * - 二维码识别容错率（部分区域被遮挡仍可识别）
   * - `low`：7% 或更少
   * - `medium`：15% 或更少
   * - `quartile`：25% 或更少
   * - `high`：30% 或更少，二维码中间放 logo 图像时推荐
   */
  errorCorrectionLevel?: 'low' | 'medium' | 'quartile' | 'high'
  unload?: React.ReactNode
}

const ifSize = (size: QRCodeBaseProps['size']) => (size ? { width: size, height: size } : {})

const QRCodeBaseProps: React.FC<QRCodeBaseProps> = ({
  size,
  value,
  useful = true,
  alt,
  style,
  foregroundColor,
  backgroundColor,
  margin,
  errorCorrectionLevel,
  unload,
  ...rest
}) => {
  const [src, setSrc] = useState('')

  useEffect(() => {
    qrcode
      .toDataURL(value, {
        color: {
          dark: foregroundColor,
          light: backgroundColor,
        },
        width: size,
        margin,
        errorCorrectionLevel,
      })
      .then((url) => setSrc(url))
      .catch((err) => console.error(err))
  }, [backgroundColor, errorCorrectionLevel, foregroundColor, margin, size, value])

  return src ? (
    <img
      src={src}
      alt={alt ?? 'QR Code'}
      style={{
        filter: useful ? 'none' : 'grayscale(100%) opacity(0.5)',
        transition: 'filter 0.2s ease',
        ...ifSize(size),
        ...style,
      }}
      {...rest}
    />
  ) : (
    <>{unload}</>
  )
}

export default QRCodeBaseProps
