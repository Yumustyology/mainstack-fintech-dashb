import React from 'react'
import { Button } from '../../ui/button'

type Props = {
  children?: React.ReactNode
  icon?: React.ReactNode
  variant?: React.ComponentProps<typeof Button>['variant']
  className?: string
  onClick?: () => void
}

const IconButton: React.FC<Props> = ({ children, icon, variant, className, onClick }) => {
  return (
    <Button variant={variant} className={className} onClick={onClick}>
      <span>{children}</span>
      {icon}
    </Button>
  )
}

export default IconButton
