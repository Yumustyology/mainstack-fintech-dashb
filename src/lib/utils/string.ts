export const fromSnake = (s?: string) => {
  if (!s) return ''
  return s
    .toString()
    .split(/[_\s]+/)
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : ''))
    .join(' ')
}

export default fromSnake
