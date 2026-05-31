import { screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { JsonCodeView } from '@/features/Converter/components/JsonCodeView'
import { ExportOutputFormat } from '@/features/Converter/export/types/exportSettings'
import { renderWithI18n } from '@/test/renderWithI18n'

const virtualizerState = vi.hoisted(() => ({
  count: 0,
}))

const highlighterMocks = vi.hoisted(() => ({
  loadCodeHighlighter: vi.fn(),
  tokenizeCodeContent: vi.fn(),
}))

vi.mock('@tanstack/react-virtual', () => ({
  useVirtualizer: ({ count }: { count: number }) => {
    virtualizerState.count = count

    return {
      getVirtualItems: () =>
        Array.from({ length: count }, (_, index) => ({
          index,
          key: index,
          size: 20,
          start: index * 20,
        })),
      getTotalSize: () => count * 20,
    }
  },
}))

vi.mock('@/features/Converter/preview/tokenizeJsonForDisplay', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@/features/Converter/preview/tokenizeJsonForDisplay')>()

  return {
    ...actual,
    loadCodeHighlighter: highlighterMocks.loadCodeHighlighter,
    tokenizeCodeContent: highlighterMocks.tokenizeCodeContent,
  }
})

const buildMultilinePreview = (lineCount: number): string => {
  return Array.from({ length: lineCount }, (_, index) => `line-${index + 1}`).join('\n')
}

const buildTokenizedLines = (lineCount: number) => {
  return Array.from({ length: lineCount }, (_, lineIndex) => [
    {
      id: `${lineIndex}-0-8`,
      content: `line-${lineIndex + 1}`,
      color: '#7aa2f7',
    },
  ])
}

describe('JsonCodeView', () => {
  beforeEach(() => {
    highlighterMocks.loadCodeHighlighter.mockReset()
    highlighterMocks.tokenizeCodeContent.mockReset()
    highlighterMocks.loadCodeHighlighter.mockResolvedValue({ highlighter: true })
    highlighterMocks.tokenizeCodeContent.mockImplementation((_highlighter, content: string) => {
      return content.split('\n').map((lineContent, lineIndex) => [
        {
          id: `${lineIndex}-0-${lineContent.length}`,
          content: lineContent,
          color: '#7aa2f7',
        },
      ])
    })
  })

  it('renders empty state when preview output is unavailable', () => {
    renderWithI18n(
      <JsonCodeView
        previewOutput=""
        hasPreviewOutput={false}
        outputFormat={ExportOutputFormat.YAML}
      />,
    )

    expect(
      screen.getByText('Convert a selection to see the YAML preview here.'),
    ).toBeInTheDocument()
  })

  it('renders plain lines before highlighter initialization completes', () => {
    highlighterMocks.loadCodeHighlighter.mockReturnValue(new Promise(() => undefined))

    renderWithI18n(
      <JsonCodeView
        previewOutput={'alpha\nbeta'}
        hasPreviewOutput
        outputFormat={ExportOutputFormat.JSON}
      />,
    )

    expect(screen.getByText('2 lines')).toBeInTheDocument()
    expect(screen.getByText('alpha')).toBeInTheDocument()
    expect(screen.getByText('beta')).toBeInTheDocument()
    expect(screen.getByText('1')).toHaveClass('w-7')
  })

  it('renders tokenized lines after highlighter loads', async () => {
    renderWithI18n(
      <JsonCodeView
        previewOutput={'{"name":"Figson"}'}
        hasPreviewOutput
        outputFormat={ExportOutputFormat.JSON}
      />,
    )

    await waitFor(() => {
      expect(highlighterMocks.loadCodeHighlighter).toHaveBeenCalledOnce()
    })

    await waitFor(() => {
      expect(highlighterMocks.tokenizeCodeContent).toHaveBeenCalled()
    })

    expect(screen.getByText('1 lines')).toBeInTheDocument()
    expect(screen.getByLabelText('Export preview with line numbers')).toBeInTheDocument()
  })

  it('continues with plain lines when highlighter initialization fails', async () => {
    highlighterMocks.loadCodeHighlighter.mockRejectedValue(new Error('load failed'))

    renderWithI18n(
      <JsonCodeView
        previewOutput={'fallback-line'}
        hasPreviewOutput
        outputFormat={ExportOutputFormat.TEXT}
      />,
    )

    await waitFor(() => {
      expect(highlighterMocks.loadCodeHighlighter).toHaveBeenCalledOnce()
    })

    expect(screen.getByText('fallback-line')).toBeInTheDocument()
  })

  it('uses medium gutter width for ten or more lines', async () => {
    renderWithI18n(
      <JsonCodeView
        previewOutput={buildMultilinePreview(10)}
        hasPreviewOutput
        outputFormat={ExportOutputFormat.JSON}
      />,
    )

    await waitFor(() => {
      expect(screen.getByText('10 lines')).toBeInTheDocument()
    })

    expect(screen.getByText('1')).toHaveClass('w-8')
  })

  it('uses wide gutter width for one hundred or more lines', async () => {
    highlighterMocks.tokenizeCodeContent.mockReturnValue(buildTokenizedLines(100))

    renderWithI18n(
      <JsonCodeView
        previewOutput={buildMultilinePreview(100)}
        hasPreviewOutput
        outputFormat={ExportOutputFormat.JSON}
      />,
    )

    await waitFor(() => {
      expect(screen.getByText('100 lines')).toBeInTheDocument()
    })

    expect(screen.getByText('1')).toHaveClass('w-10')
    expect(virtualizerState.count).toBe(100)
  })
})
