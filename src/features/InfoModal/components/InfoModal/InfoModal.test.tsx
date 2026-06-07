import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { InfoModal } from '@/features/InfoModal/components/InfoModal'
import { renderWithI18n } from '@/test/renderWithI18n'

describe('InfoModal', () => {
  it('opens usage dialog when trigger is clicked', async () => {
    const user = userEvent.setup()

    renderWithI18n(<InfoModal />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'How to use' }))

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'How to use Figson Converter' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Detail level differences' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Model output can vary' })).toBeInTheDocument()
  })
})
