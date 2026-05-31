import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ConverterStatusLabel } from '@/features/Converter/components/ConverterStatusLabel'
import type { StatusMessageState } from '@/features/Converter/workflow/types/statusMessage'

describe('ConverterStatusLabel', () => {
  it('returns nothing for idle status', () => {
    const statusMessage: StatusMessageState = { variant: 'idle', text: 'Hidden' }

    const { container } = render(<ConverterStatusLabel statusMessage={statusMessage} />)

    expect(container).toBeEmptyDOMElement()
  })

  it.each([
    ['info', 'Processing selection...'],
    ['success', 'Conversion complete'],
    ['error', 'Conversion failed'],
  ] as const)('renders %s status message', (variant, text) => {
    render(<ConverterStatusLabel statusMessage={{ variant, text }} />)

    const status = screen.getByRole('status')

    expect(status).toHaveTextContent(text)
    expect(status).toHaveAttribute('aria-live', 'polite')
  })
})
