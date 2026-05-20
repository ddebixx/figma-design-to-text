export const formatJsonOutput = (payload: unknown): string => {
  if (payload === undefined) {
    return ''
  }

  try {
    return JSON.stringify(payload, null, 2)
  } catch {
    return ''
  }
}
