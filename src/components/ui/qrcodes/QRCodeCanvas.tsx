import React, { useRef, useEffect, useCallback } from 'react'
import qrcode from 'qrcode'

export interface QRCodeCanvasProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  value: string
  useful?: boolean
  uselessElem?: React.ReactNode
  uselessProps?: React.HTMLAttributes<HTMLDivElement>
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
   * - 默认：`4`（qrcode 不设置 margin 默认值是 4）
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
  size?: number | string // 可控尺寸
  fullWidth?: boolean // 是否全屏宽度
}

export const QRCodeCanvas: React.FC<QRCodeCanvasProps> = ({
  value,
  useful = true,
  uselessElem,
  uselessProps: { style: uselessStyle = {}, ...uselessProps } = {},
  foregroundColor = '#000000',
  backgroundColor = '#ffffff',
  margin = 4,
  errorCorrectionLevel = 'medium',
  size,
  fullWidth,
  style,
  ...rest
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const renderQR = useCallback(
    (size: number) => {
      const canvas = canvasRef.current
      if (!canvas) return

      qrcode.toCanvas(
        canvas,
        value,
        {
          errorCorrectionLevel,
          margin,
          width: size,
          color: {
            dark: foregroundColor,
            light: backgroundColor,
          },
        },
        (err) => {
          if (err) console.error(err)
          if (!useful) {
            const ctx = canvas.getContext('2d')
            if (ctx) {
              ctx.globalCompositeOperation = 'source-over'
              ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
              ctx.fillRect(0, 0, canvas.width, canvas.height)
              ctx.filter = 'grayscale(100%) opacity(0.5)'
              ctx.drawImage(canvas, 0, 0)
            }
          }
        },
      )
    },
    [backgroundColor, errorCorrectionLevel, foregroundColor, margin, useful, value],
  )

  useEffect(() => {
    // 监听容器尺寸变化，用于动态缩放
    const container = containerRef.current
    if (!container) return

    const resizeObserver = new ResizeObserver(() => {
      const size = Math.min(container.clientWidth, container.clientHeight)
      renderQR(size)
    })

    resizeObserver.observe(container)

    return () => resizeObserver.disconnect()
  }, [value, useful, foregroundColor, backgroundColor, margin, errorCorrectionLevel, renderQR])

  return (
    <div
      ref={containerRef}
      style={{
        width: fullWidth ? '100%' : size,
        height: fullWidth ? '100%' : size,
        display: 'flex',
        aspectRatio: '1',
        position: 'relative',
        ...style,
      }}
      {...rest}
    >
      <canvas ref={canvasRef} />
      {!useful && uselessElem && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            background: 'radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 80%)',
            opacity: 0.5,
            ...uselessStyle,
          }}
          {...uselessProps}
        >
          {uselessElem}
        </div>
      )}
    </div>
  )
}

