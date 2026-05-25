import { useVirtualizer, type VirtualItem } from '@tanstack/react-virtual'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
import { JsonCodeLine } from '@/features/Converter/components/JsonCodeLine'
import { SCROLLBAR_CLASS } from '@/features/Converter/consts/glassPanelStyles'
import { resolveExportFormatLabel } from '@/features/Converter/export/resolve/resolveExportFormatLabel'
import type { ExportOutputFormat } from '@/features/Converter/export/types/exportSettings'
import { buildCodeDisplayLines, buildPlainDisplayLines } from '@/features/Converter/preview/buildJsonDisplayLines'
import {
  type CodeHighlighter,
  loadCodeHighlighter,
  tokenizeCodeContent,
} from '@/features/Converter/preview/tokenizeJsonForDisplay'

const LINE_HEIGHT_PX = 20
const VIRTUAL_OVERSCAN_LINES = 10

type JsonCodeViewProps = {
  previewOutput: string
  hasPreviewOutput: boolean
  outputFormat: ExportOutputFormat
}

const resolveLineNumberGutterClass = (lineCount: number): string => {
  if (lineCount >= 100) {
    return 'w-10'
  }

  if (lineCount >= 10) {
    return 'w-8'
  }

  return 'w-7'
}

export const JsonCodeView = ({
  previewOutput,
  hasPreviewOutput,
  outputFormat,
}: JsonCodeViewProps) => {
  const { t } = useTranslation()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [highlighter, setHighlighter] = useState<CodeHighlighter | null>(null)

  useEffect(() => {
    async function initializeCodeHighlighter() {
      try {
        const instance = await loadCodeHighlighter()
        setHighlighter(instance)
      } catch {
        
      }
    }

    initializeCodeHighlighter()
  }, [])

  const displayLines = useMemo(() => {
    if (!highlighter) {
      return buildPlainDisplayLines(previewOutput)
    }

    const tokenLines = tokenizeCodeContent(highlighter, previewOutput, outputFormat)

    return buildCodeDisplayLines(tokenLines)
  }, [highlighter, previewOutput, outputFormat])

  const lineCount = displayLines.length
  const lineNumberGutterClass = resolveLineNumberGutterClass(lineCount)

  const lineNumberClass = twMerge(
    'shrink-0 select-none border-r border-zinc-800/80 pr-3 text-right tabular-nums text-zinc-600',
    lineNumberGutterClass,
  )

  const virtualList = useVirtualizer({
    count: lineCount,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => LINE_HEIGHT_PX,
    overscan: VIRTUAL_OVERSCAN_LINES,
  })

  const scrollViewportClass = twMerge(
    SCROLLBAR_CLASS,
    'max-h-64 overflow-auto font-mono text-[12px] leading-[1.65]',
  )

  if (!hasPreviewOutput) {
    const formatLabel = resolveExportFormatLabel(outputFormat)

    return (
      <p className="px-3 py-10 text-center font-mono text-xs text-zinc-500">
        {t('output.empty', { format: formatLabel })}
      </p>
    )
  }

  const virtualRows = virtualList.getVirtualItems()

  return (
    <div className="flex max-h-64 flex-col overflow-hidden">
      <p
        className="shrink-0 border-b border-zinc-800/80 px-3 py-1.5 text-[10px] font-medium tracking-wide text-zinc-500"
        aria-live="polite"
      >
        {t('output.lineCount', { count: lineCount })}
      </p>

      <div
        ref={scrollContainerRef}
        className={scrollViewportClass}
        role="region"
        aria-label={t('output.codeRegion')}
      >
        <div className="relative w-full py-2" style={{ height: virtualList.getTotalSize() }}>
          {virtualRows.map((virtualRow: VirtualItem) => {
            const line = displayLines[virtualRow.index]

            return (
              <div
                key={line.id}
                className="absolute top-0 left-0 w-full"
                style={{
                  height: virtualRow.size,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <JsonCodeLine
                  line={line}
                  lineNumberClass={lineNumberClass}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
