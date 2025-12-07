import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export { getIconStyle } from './utils/getIconStyle'
export { formatUSD } from './utils/formatCurrency'
export { fromSnake } from './utils/string'
export { formatDate } from './utils/formatDate'
export { deriveTypeOptions, deriveStatusOptions, FALLBACK_TYPE_OPTIONS, FALLBACK_STATUS_OPTIONS } from './utils/deriveOptions'
