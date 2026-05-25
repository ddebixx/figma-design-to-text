import { createHighlighterCore, type HighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import type { ExportOutputFormat } from '@/features/Converter/export/types/exportSettings'

export type CodeHighlighter = HighlighterCore

export type CodeDisplayToken = {
  content: string
  color: string
}

const SHIKI_THEME = 'tokyo-night'

const OUTPUT_FORMAT_LANGUAGE: Partial<Record<ExportOutputFormat, string>> = {
  json: 'json',
  yaml: 'yaml',
  markdown: 'markdown',
}

let highlighterInstance: HighlighterCore | null = null

export const loadCodeHighlighter = async (): Promise<CodeHighlighter> => {
  if (highlighterInstance) {
    return highlighterInstance
  }

  highlighterInstance = await createHighlighterCore({
    engine: createJavaScriptRegexEngine(),
    themes: [import('@shikijs/themes/tokyo-night')],
    langs: [
      import('@shikijs/langs/json'),
      import('@shikijs/langs/yaml'),
      import('@shikijs/langs/markdown'),
    ],
  })

  return highlighterInstance
}

const buildPlainTokenLines = (content: string): CodeDisplayToken[][] => {
  return content.split('\n').map((line) => [{ content: line, color: '' }])
}

export const tokenizeCodeContent = (
  highlighter: CodeHighlighter,
  content: string,
  outputFormat: ExportOutputFormat,
): CodeDisplayToken[][] => {
  const language = OUTPUT_FORMAT_LANGUAGE[outputFormat]

  if (!language) {
    return buildPlainTokenLines(content)
  }

  try {
    const { tokens } = highlighter.codeToTokens(content, {
      lang: language,
      theme: SHIKI_THEME,
    })

    return tokens.map((lineTokens) =>
      lineTokens.map((token) => ({
        content: token.content,
        color: token.color ?? '',
      })),
    )
  } catch {
    return buildPlainTokenLines(content)
  }
}
