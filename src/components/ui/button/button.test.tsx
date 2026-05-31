import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button, buttonVariants } from '@/components/ui/button'

describe('Button', () => {
  it('renders a button with default variant and size', () => {
    render(<Button type="submit">Save</Button>)

    const button = screen.getByRole('button', { name: 'Save' })

    expect(button).toHaveAttribute('data-slot', 'button')
    expect(button).toHaveAttribute('data-variant', 'default')
    expect(button).toHaveAttribute('data-size', 'default')
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('renders as child element when asChild is true', () => {
    render(
      <Button asChild variant="link" size="sm">
        <a href="/docs">Docs</a>
      </Button>,
    )

    const link = screen.getByRole('link', { name: 'Docs' })

    expect(link).toHaveAttribute('data-slot', 'button')
    expect(link).toHaveAttribute('data-variant', 'link')
    expect(link).toHaveAttribute('data-size', 'sm')
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Action</Button>)

    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it.each([
    ['outline', 'outline'],
    ['secondary', 'secondary'],
    ['ghost', 'ghost'],
    ['destructive', 'destructive'],
    ['link', 'link'],
  ] as const)('renders %s variant', (variant, expectedVariant) => {
    render(<Button variant={variant}>Variant</Button>)

    expect(screen.getByRole('button')).toHaveAttribute('data-variant', expectedVariant)
  })

  it.each([
    ['xs', 'xs'],
    ['sm', 'sm'],
    ['lg', 'lg'],
    ['icon', 'icon'],
    ['icon-xs', 'icon-xs'],
    ['icon-sm', 'icon-sm'],
    ['icon-lg', 'icon-lg'],
  ] as const)('renders %s size', (size, expectedSize) => {
    render(<Button size={size}>Sized</Button>)

    expect(screen.getByRole('button')).toHaveAttribute('data-size', expectedSize)
  })
})

describe('buttonVariants', () => {
  it('returns class names for variant and size combinations', () => {
    const className = buttonVariants({ variant: 'destructive', size: 'lg' })

    expect(className).toContain('bg-destructive/10')
    expect(className).toContain('h-10')
  })
})
