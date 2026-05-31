import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Converter } from '@/features/Converter/components/Converter'
import { renderWithI18n } from '@/test/renderWithI18n'

const workflowMock = vi.hoisted(() => ({
  previewOutput: '{"name":"Figson"}',
  hasPreviewOutput: true,
  exportSettings: {
    detailLevel: 'balanced',
    outputFormat: 'yaml',
  },
  isProcessing: false,
  isDownloading: false,
  statusMessage: { variant: 'idle' as const, text: '' },
  handleConvertClick: vi.fn(),
  handleDownloadClick: vi.fn(),
  handleDetailLevelChange: vi.fn(),
  handleOutputFormatChange: vi.fn(),
}))

vi.mock('@/features/Converter/workflow/hooks/useConverterWorkflow', () => ({
  useConverterWorkflow: () => workflowMock,
}))

describe('Converter', () => {
  it('renders header, actions, and output panel from workflow state', () => {
    renderWithI18n(<Converter />)

    expect(screen.getByRole('heading', { level: 1, name: 'Figson Converter' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Export selection' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Export preview' })).toBeInTheDocument()
    expect(screen.getByLabelText('Export preview with line numbers')).toBeInTheDocument()
  })
})
