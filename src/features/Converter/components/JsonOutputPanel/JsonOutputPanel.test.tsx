import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { JsonOutputPanel } from '@/features/Converter/components/JsonOutputPanel'
import { ExportOutputFormat } from '@/features/Converter/export/types/exportSettings'
import { renderWithI18n } from '@/test/renderWithI18n'

vi.mock('@/features/Converter/components/JsonCodeView', () => ({
  JsonCodeView: ({
    previewOutput,
    hasPreviewOutput,
  }: {
    previewOutput: string
    hasPreviewOutput: boolean
  }) => (
    <div data-testid="json-code-view">{hasPreviewOutput ? previewOutput : 'empty-preview'}</div>
  ),
}))

describe('JsonOutputPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders collapsible panel with format hint and preview content', async () => {
    const user = userEvent.setup()

    renderWithI18n(
      <JsonOutputPanel
        previewOutput={'name: Figson\n'}
        hasPreviewOutput
        outputFormat={ExportOutputFormat.YAML}
      />,
    )

    expect(screen.getByRole('button', { name: 'Export preview' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    expect(
      screen.getByText('Compact DSL — excellent readability with fewer tokens.'),
    ).toBeInTheDocument()
    expect(screen.getByTestId('json-code-view')).toHaveTextContent('name: Figson')

    await user.click(screen.getByRole('button', { name: 'Export preview' }))

    expect(screen.getByRole('button', { name: 'Export preview' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })

  it('opens panel when preview output becomes available', async () => {
    const { rerender } = renderWithI18n(
      <JsonOutputPanel
        previewOutput=""
        hasPreviewOutput={false}
        outputFormat={ExportOutputFormat.JSON}
      />,
    )

    expect(screen.getByRole('button', { name: 'Export preview' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )

    rerender(
      <JsonOutputPanel
        previewOutput={'{"name":"Figson"}'}
        hasPreviewOutput
        outputFormat={ExportOutputFormat.JSON}
      />,
    )

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Export preview' })).toHaveAttribute(
        'aria-expanded',
        'true',
      )
    })
  })
})
