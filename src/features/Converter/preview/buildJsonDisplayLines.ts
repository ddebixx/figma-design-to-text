import type { CodeDisplayToken } from '@/features/Converter/preview/tokenizeJsonForDisplay'

export type CodeDisplayLine = {
  id: string
  lineNumber: number
  tokens: CodeDisplayToken[]
}

export const buildCodeDisplayLines = (tokenLines: CodeDisplayToken[][]): CodeDisplayLine[] => {
  return tokenLines.map((tokens, lineIndex) => {
    const lineNumber = lineIndex + 1

    return {
      id: `line-${lineNumber}`,
      lineNumber,
      tokens,
    }
  })
}

export const buildPlainDisplayLines = (content: string): CodeDisplayLine[] => {
  return content.split('\n').map((lineContent, lineIndex) => {
    const lineNumber = lineIndex + 1

    return {
      id: `line-${lineNumber}`,
      lineNumber,
      tokens: [{ content: lineContent, color: '' }],
    }
  })
}
