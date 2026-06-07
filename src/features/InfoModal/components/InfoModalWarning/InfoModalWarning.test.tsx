import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { InfoModalWarning } from '@/features/InfoModal/components/InfoModalWarning'
import { renderWithI18n } from '@/test/renderWithI18n'

describe('InfoModalWarning', () => {
  it('renders model variance warning and screenshot tip', () => {
    renderWithI18n(<InfoModalWarning />)

    expect(screen.getByRole('heading', { name: 'Model output can vary' })).toBeInTheDocument()
    expect(
      screen.getByText(/Different AI models may interpret the same export differently/i),
    ).toBeInTheDocument()
    expect(screen.getByText(/Include screenshots alongside the export/i)).toBeInTheDocument()
  })
})
