import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Spinner } from './spinner'

describe('Spinner', () => {
  it('renders loading status indicator', () => {
    render(<Spinner />)

    const spinner = screen.getByRole('status', { name: 'Loading' })

    expect(spinner).toHaveClass('animate-spin')
  })

  it('applies custom className', () => {
    render(<Spinner className="size-8" data-testid="spinner" />)

    expect(screen.getByTestId('spinner')).toHaveClass('size-8')
  })
})
