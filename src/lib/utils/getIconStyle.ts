import type { CSSProperties } from 'react'

type Params = {
  size?: number | string
  color?: string
  className?: string
  defaultWidth?: number
  defaultHeight?: number
}

export function getIconStyle({ size, color, className, defaultWidth, defaultHeight }: Params): CSSProperties {
  const dimensionStyle: CSSProperties = className
    ? {}
    : typeof size === 'number'
    ? { width: `${size}px`, height: `${size}px` }
    : size
    ? ({ width: size as string, height: size as string } as CSSProperties)
    : defaultWidth && defaultHeight
    ? ({ width: `${defaultWidth}px`, height: `${defaultHeight}px` } as CSSProperties)
    : {}

  return color ? ({ color, ...dimensionStyle } as CSSProperties) : dimensionStyle
}

export default getIconStyle
