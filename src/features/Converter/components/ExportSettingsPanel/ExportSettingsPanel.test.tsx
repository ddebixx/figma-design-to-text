import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { DEFAULT_EXPORT_SETTINGS } from '@/features/Converter/export/consts/exportSettings'
import {
  ExportDetailLevel,
  ExportOutputFormat,
} from '@/features/Converter/export/types/exportSettings'
import { renderWithI18n } from '@/test/renderWithI18n'
import { ExportSettingsPanel } from './ExportSettingsPanel'

describe('ExportSettingsPanel', () => {
  it('renders detail level and output format controls with hints', () => {
    renderWithI18n(
      <ExportSettingsPanel
        exportSettings={DEFAULT_EXPORT_SETTINGS}
        onDetailLevelChange={vi.fn()}
        onOutputFormatChange={vi.fn()}
      />,
    )

    expect(screen.getByText('Detail level')).toBeInTheDocument()
    expect(screen.getByText('Output format')).toBeInTheDocument()
    expect(
      screen.getByText('Removes noise like IDs and layout metadata — good default.'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Compact DSL — excellent readability with fewer tokens.'),
    ).toBeInTheDocument()
  })

  it('calls change handlers when selections change', async () => {
    const user = userEvent.setup()
    const handleDetailLevelChange = vi.fn()
    const handleOutputFormatChange = vi.fn()

    renderWithI18n(
      <ExportSettingsPanel
        exportSettings={DEFAULT_EXPORT_SETTINGS}
        onDetailLevelChange={handleDetailLevelChange}
        onOutputFormatChange={handleOutputFormatChange}
      />,
    )

    await user.click(screen.getByRole('combobox', { name: 'Detail level' }))
    await user.click(within(screen.getByRole('listbox')).getByText('Precise'))

    expect(handleDetailLevelChange).toHaveBeenCalledWith(ExportDetailLevel.PRECISE)

    await user.click(screen.getByRole('combobox', { name: 'Output format' }))
    await user.click(within(screen.getByRole('listbox')).getByText('JSON'))

    expect(handleOutputFormatChange).toHaveBeenCalledWith(ExportOutputFormat.JSON)
  })
})
