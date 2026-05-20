export type JsonDisplayLine = {
  id: string
  lineNumber: number
  lineContent: string
}

export const buildJsonDisplayLines = (json: string): JsonDisplayLine[] => {
  const lineContents = json.split('\n')

  return lineContents.map((lineContent, lineIndex) => {
    const lineNumber = lineIndex + 1

    return {
      id: `line-${lineNumber}`,
      lineNumber,
      lineContent,
    }
  })
}
