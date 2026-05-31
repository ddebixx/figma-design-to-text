import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderWithI18n } from '@/test/renderWithI18n'
import { ConvertActionButton } from './ConvertActionButton'

describe('ConvertActionButton', () => {
  it('renders convert label and handles click when idle', async () => {
    const user = userEvent.setup()
    const handleConvertClick = vi.fn()

    renderWithI18n(<ConvertActionButton isProcessing={false} onConvertClick={handleConvertClick} />)

    const button = screen.getByRole('button', { name: 'Convert selection' })

    expect(button).not.toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'false')

    await user.click(button)

    expect(handleConvertClick).toHaveBeenCalledOnce()
  })

  it('renders spinner and disabled state while processing', () => {
    renderWithI18n(<ConvertActionButton isProcessing onConvertClick={vi.fn()} />)

    const button = screen.getByRole('button', { name: /Converting\.\.\./ })

    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument()
  })
})
