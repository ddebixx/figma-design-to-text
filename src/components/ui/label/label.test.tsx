import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Label, labelVariants } from '@/components/ui/label'

describe('Label', () => {
  it('renders default label', () => {
    render(<Label htmlFor="name">Name</Label>)

    const label = screen.getByText('Name')

    expect(label).toHaveAttribute('data-slot', 'label')
    expect(label).toHaveAttribute('for', 'name')
  })

  it('applies custom className', () => {
    render(<Label className="custom-label">Custom</Label>)

    expect(screen.getByText('Custom')).toHaveClass('custom-label')
  })

  it.each([
    ['info', 'text-zinc-400'],
    ['success', 'text-emerald-400'],
    ['error', 'text-destructive'],
  ] as const)('renders %s variant', (variant, expectedClassFragment) => {
    render(<Label variant={variant}>Status</Label>)

    expect(screen.getByText('Status')).toHaveClass(expectedClassFragment)
  })
})

describe('labelVariants', () => {
  it('returns class names for the default variant', () => {
    const className = labelVariants({ variant: 'default' })

    expect(className).toContain('text-foreground')
  })
})
