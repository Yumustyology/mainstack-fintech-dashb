import type { UserResponse } from "../types/api"

export function getInitialsFromUser(u?: UserResponse): string | undefined {
  if (!u) return undefined
  if (u.first_name && u.last_name)
    return `${u.first_name?.[0] || ''}${u.last_name?.[0] || ''}`.toUpperCase()
  if (u.email) {
    const local = String(u.email).split('@')[0] || ''
    if (local.length >= 2) return local.slice(0, 2).toUpperCase()
    if (local.length === 1) return local.toUpperCase()
  }
  return undefined
}

export default getInitialsFromUser
