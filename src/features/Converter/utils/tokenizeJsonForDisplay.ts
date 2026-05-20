export const JsonTokenType = {
  KEY: 'key',
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  NULL: 'null',
  PUNCTUATION: 'punctuation',
  WHITESPACE: 'whitespace',
} as const

export type JsonTokenType = (typeof JsonTokenType)[keyof typeof JsonTokenType]

export type JsonDisplayToken = {
  id: string
  type: JsonTokenType
  value: string
}

const buildJsonDisplayTokenId = (startIndex: number, tokenType: JsonTokenType): string => {
  return `${startIndex}-${tokenType}`
}

const JSON_TOKEN_PATTERN =
  /"(?:\\.|[^"\\])*"(?=\s*:)|"(?:\\.|[^"\\])*"|\btrue\b|\bfalse\b|\bnull\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|[{}[\],:]|\s+/g

const resolveJsonTokenType = (tokenValue: string): JsonTokenType => {
  if (/^\s+$/.test(tokenValue)) {
    return JsonTokenType.WHITESPACE
  }

  if (tokenValue === 'true' || tokenValue === 'false') {
    return JsonTokenType.BOOLEAN
  }

  if (tokenValue === 'null') {
    return JsonTokenType.NULL
  }

  if (/^-?\d/.test(tokenValue)) {
    return JsonTokenType.NUMBER
  }

  if (tokenValue.startsWith('"')) {
    return JsonTokenType.STRING
  }

  return JsonTokenType.PUNCTUATION
}

const isJsonKeyToken = (tokenValue: string, source: string, tokenStartIndex: number): boolean => {
  const afterToken = source.slice(tokenStartIndex + tokenValue.length)
  return /^\s*:/.test(afterToken)
}

export const tokenizeJsonForDisplay = (json: string): JsonDisplayToken[] => {
  const tokens: JsonDisplayToken[] = []
  const pattern = new RegExp(JSON_TOKEN_PATTERN.source, 'g')
  let match = pattern.exec(json)
  let lastIndex = 0

  while (match) {
    const tokenValue = match[0]
    const tokenStartIndex = match.index

    if (tokenStartIndex > lastIndex) {
      tokens.push({
        id: buildJsonDisplayTokenId(lastIndex, JsonTokenType.WHITESPACE),
        type: JsonTokenType.WHITESPACE,
        value: json.slice(lastIndex, tokenStartIndex),
      })
    }

    let tokenType = resolveJsonTokenType(tokenValue)

    if (tokenValue.startsWith('"') && isJsonKeyToken(tokenValue, json, tokenStartIndex)) {
      tokenType = JsonTokenType.KEY
    }

    tokens.push({
      id: buildJsonDisplayTokenId(tokenStartIndex, tokenType),
      type: tokenType,
      value: tokenValue,
    })
    lastIndex = tokenStartIndex + tokenValue.length
    match = pattern.exec(json)
  }

  if (lastIndex < json.length) {
    tokens.push({
      id: buildJsonDisplayTokenId(lastIndex, JsonTokenType.WHITESPACE),
      type: JsonTokenType.WHITESPACE,
      value: json.slice(lastIndex),
    })
  }

  return tokens
}
