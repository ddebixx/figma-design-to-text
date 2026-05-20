import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { JSON_TOKEN_STYLE_MAP } from '@/features/Converter/consts/jsonTokenStyles'
import type { JsonDisplayLine } from '@/features/Converter/utils/buildJsonDisplayLines'
import { tokenizeJsonForDisplay } from '@/features/Converter/utils/tokenizeJsonForDisplay'

type JsonCodeLineProps = {
  line: JsonDisplayLine
  lineNumberClass: string
}

export const JsonCodeLine = ({ line, lineNumberClass }: JsonCodeLineProps) => {
  const lineTokens = useMemo(
    () => tokenizeJsonForDisplay(line.lineContent),
    [line.lineContent],
  )

  return (
    <div className="flex min-h-[1.65em]">
      <span className={lineNumberClass} aria-hidden>
        {line.lineNumber}
      </span>
      <code className="min-w-0 flex-1 whitespace-pre px-3">
        {lineTokens.map((token) => (
          <span key={token.id} className={twMerge(JSON_TOKEN_STYLE_MAP[token.type])}>
            {token.value}
          </span>
        ))}
      </code>
    </div>
  )
}
