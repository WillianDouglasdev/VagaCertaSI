export function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
}

export function containsTerm(value: string, term: string) {
  const normalizedValue = normalizeText(value)
  const normalizedTerm = normalizeText(term)
  const escapedTerm = normalizedTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  return new RegExp(`(^|[^a-z0-9])${escapedTerm}([^a-z0-9]|$)`, 'i').test(
    normalizedValue,
  )
}
