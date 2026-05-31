import type { CodeDisplayLine } from '@/features/Converter/preview/buildJsonDisplayLines'

type JsonCodeLineProps = {
  line: CodeDisplayLine
  lineNumberClass: string
}

export const JsonCodeLine = ({ line, lineNumberClass }: JsonCodeLineProps) => {
  return (
    <div className="flex min-h-[1.65em]">
      <span className={lineNumberClass} aria-hidden>
        {line.lineNumber}
      </span>
      <code className="min-w-0 flex-1 whitespace-pre px-3">
        {line.tokens.map((token) => (
          <span key={token.id} style={token.color ? { color: token.color } : undefined}>
            {token.content}
          </span>
        ))}
      </code>
    </div>
  )
}
