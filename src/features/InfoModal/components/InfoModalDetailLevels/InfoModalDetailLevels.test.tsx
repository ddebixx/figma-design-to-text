import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { InfoModalDetailLevels } from '@/features/InfoModal/components/InfoModalDetailLevels'
import { INFO_MODAL_DETAIL_LEVELS } from '@/features/InfoModal/consts/infoModalDetailLevels'
import { renderWithI18n } from '@/test/renderWithI18n'

describe('InfoModalDetailLevels', () => {
  it('renders detail level comparison for every precision type', () => {
    renderWithI18n(<InfoModalDetailLevels />)

    expect(screen.getByRole('heading', { name: 'Detail level differences' })).toBeInTheDocument()
    expect(
      screen.getByText('Pick the trade-off between design fidelity and token size.'),
    ).toBeInTheDocument()
    expect(INFO_MODAL_DETAIL_LEVELS).toHaveLength(3)
    expect(screen.getByText('Precise')).toBeInTheDocument()
    expect(screen.getByText('Balanced')).toBeInTheDocument()
    expect(screen.getByText('Efficient')).toBeInTheDocument()
    expect(screen.getByText(/Uses the most tokens/i)).toBeInTheDocument()
    expect(screen.getByText(/semantic compression/i)).toBeInTheDocument()
  })
})
