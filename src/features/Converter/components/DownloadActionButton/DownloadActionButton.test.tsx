import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ExportOutputFormat } from '@/features/Converter/export/types/exportSettings'
import { renderWithI18n } from '@/test/renderWithI18n'
import { DownloadActionButton } from './DownloadActionButton'

describe('DownloadActionButton', () => {
  it('renders download label and handles click when enabled', async () => {
    const user = userEvent.setup()
    const handleDownloadClick = vi.fn()

    renderWithI18n(
      <DownloadActionButton
        outputFormat={ExportOutputFormat.YAML}
        isDownloading={false}
        isDisabled={false}
        onDownloadClick={handleDownloadClick}
      />,
    )

    const button = screen.getByRole('button', { name: 'Download YAML' })

    await user.click(button)

    expect(handleDownloadClick).toHaveBeenCalledOnce()
  })

  it('disables button when preview output is unavailable', () => {
    renderWithI18n(
      <DownloadActionButton
        outputFormat={ExportOutputFormat.JSON}
        isDownloading={false}
        isDisabled
        onDownloadClick={vi.fn()}
      />,
    )

    expect(screen.getByRole('button', { name: 'Download JSON' })).toBeDisabled()
  })

  it('renders downloading state with spinner', () => {
    renderWithI18n(
      <DownloadActionButton
        outputFormat={ExportOutputFormat.TEXT}
        isDownloading
        isDisabled={false}
        onDownloadClick={vi.fn()}
      />,
    )

    const button = screen.getByRole('button', { name: /Downloading\.\.\./ })

    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument()
  })
})
