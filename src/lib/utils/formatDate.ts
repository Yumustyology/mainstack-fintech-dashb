export function formatDate(input: string | number | Date) {
  const d = new Date(input)
  return d
    .toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    .replace(", ", ",")
}

export default formatDate
