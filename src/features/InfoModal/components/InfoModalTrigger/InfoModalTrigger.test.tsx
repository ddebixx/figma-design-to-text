import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Dialog } from '@/components/ui/dialog'
import { InfoModalTrigger } from '@/features/InfoModal/components/InfoModalTrigger'
import { renderWithI18n } from '@/test/renderWithI18n'

describe('InfoModalTrigger', () => {
  it('renders accessible info trigger button', () => {
    renderWithI18n(
      <Dialog>
        <InfoModalTrigger />
      </Dialog>,
    )

    expect(screen.getByRole('button', { name: 'How to use' })).toBeInTheDocument()
  })
})
