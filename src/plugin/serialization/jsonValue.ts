export type JsonValue = string | number | boolean | JsonValue[] | JsonRecord

export type JsonRecord = { [key: string]: JsonValue }

export const FIGMA_MIXED_SENTINEL = 'MIXED' as const

export function compactRecord(parts: ReadonlyArray<JsonRecord>): JsonRecord {
  const merged: JsonRecord = {}

  for (const part of parts) {
    for (const key of Object.keys(part)) {
      merged[key] = part[key]
    }
  }

  return merged
}

export function serializeFigmaValue(value: unknown): JsonValue {
  if (value === figma.mixed) {
    return FIGMA_MIXED_SENTINEL
  }

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return value
  }

  if (Array.isArray(value)) {
    return value.map((item) => serializeFigmaValue(item))
  }

  if (value && typeof value === 'object') {
    return serializePlainObject(value as Record<string, unknown>)
  }

  return String(value)
}

function serializePlainObject(record: Record<string, unknown>): JsonRecord {
  const serialized: JsonRecord = {}

  for (const key of Object.keys(record)) {
    const fieldValue = record[key]

    if (fieldValue === undefined || fieldValue === null) {
      continue
    }

    serialized[key] = serializeFigmaValue(fieldValue)
  }

  return serialized
}
