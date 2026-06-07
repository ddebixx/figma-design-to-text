import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Dialog } from '@/components/ui/dialog'
import { InfoModalContent } from '@/features/InfoModal/components/InfoModalContent'
import { renderWithI18n } from '@/test/renderWithI18n'

describe('InfoModalContent', () => {
  it('renders dialog title, steps, and warning', () => {
    renderWithI18n(
      <Dialog open>
        <InfoModalContent />
      </Dialog>,
    )

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'How to use Figson Converter' })).toBeInTheDocument()
    expect(
      screen.getByText('Follow these steps to turn Figma selections into AI-ready exports.'),
    ).toBeInTheDocument()
    expect(screen.getByText('Select a frame or component')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Model output can vary' })).toBeInTheDocument()
  })
})
