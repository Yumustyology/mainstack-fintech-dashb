import React from 'react'

type Props = {
  className?: string
  width?: number | string
  height?: number | string
}

const IncomingIcon: React.FC<Props> = ({ className, width = 20, height = 20 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden
  >
    <path d="M4.75 15.25V7.75H5.58333V13.8333L15.6667 3.75L16.25 4.33333L6.16667 14.4167H12.25V15.25H4.75Z" fill="#075132" />
  </svg>
)

export default IncomingIcon
