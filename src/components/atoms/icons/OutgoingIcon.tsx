import React from 'react'

type Props = {
  className?: string
  width?: number | string
  height?: number | string
}

const OutgoingIcon: React.FC<Props> = ({ className, width = 20, height = 20 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden
  >
    <path d="M4.49984 16.0833L3.9165 15.5L13.9998 5.41668H7.9165V4.58334H15.4165V12.0833H14.5832V6.00001L4.49984 16.0833Z" fill="#961100" />
  </svg>
)

export default OutgoingIcon
