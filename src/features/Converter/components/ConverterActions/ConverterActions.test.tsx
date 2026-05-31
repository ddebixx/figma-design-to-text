import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ConverterActions } from '@/features/Converter/components/ConverterActions'
import { DEFAULT_EXPORT_SETTINGS } from '@/features/Converter/export/consts/exportSettings'
import { IDLE_STATUS_MESSAGE } from '@/features/Converter/workflow/types/statusMessage'
import { renderWithI18n } from '@/test/renderWithI18n'

describe('ConverterActions', () => {
  it('renders export section with settings, actions, and status label', () => {
    renderWithI18n(
      <ConverterActions
        isProcessing={false}
        isDownloading={false}
        hasPreviewOutput
        exportSettings={DEFAULT_EXPORT_SETTINGS}
        statusMessage={{ variant: 'success', text: 'Conversion complete' }}
        onConvertClick={vi.fn()}
        onDownloadClick={vi.fn()}
        onDetailLevelChange={vi.fn()}
        onOutputFormatChange={vi.fn()}
      />,
    )

    expect(screen.getByRole('region', { name: 'Export selection' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Convert selection' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Download YAML' })).toBeEnabled()
    expect(screen.getByRole('status')).toHaveTextContent('Conversion complete')
  })

  it('disables download when preview output is missing', () => {
    renderWithI18n(
      <ConverterActions
        isProcessing={false}
        isDownloading={false}
        hasPreviewOutput={false}
        exportSettings={DEFAULT_EXPORT_SETTINGS}
        statusMessage={IDLE_STATUS_MESSAGE}
        onConvertClick={vi.fn()}
        onDownloadClick={vi.fn()}
        onDetailLevelChange={vi.fn()}
        onOutputFormatChange={vi.fn()}
      />,
    )

    expect(screen.getByRole('button', { name: 'Download YAML' })).toBeDisabled()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})
