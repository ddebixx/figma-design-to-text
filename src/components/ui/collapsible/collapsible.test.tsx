import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

describe('Collapsible', () => {
  it('renders trigger and content with data slots', async () => {
    const user = userEvent.setup()

    render(
      <Collapsible defaultOpen={false}>
        <CollapsibleTrigger>Toggle panel</CollapsibleTrigger>
        <CollapsibleContent>Panel body</CollapsibleContent>
      </Collapsible>,
    )

    expect(screen.getByRole('button', { name: 'Toggle panel' })).toHaveAttribute(
      'data-slot',
      'collapsible-trigger',
    )

    expect(screen.queryByText('Panel body')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Toggle panel' }))

    expect(screen.getByText('Panel body')).toHaveAttribute('data-slot', 'collapsible-content')
  })

  it('renders open content by default when defaultOpen is true', () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Open trigger</CollapsibleTrigger>
        <CollapsibleContent>Visible content</CollapsibleContent>
      </Collapsible>,
    )

    expect(screen.getByText('Visible content')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open trigger' })).toHaveAttribute(
      'data-slot',
      'collapsible-trigger',
    )
  })
})
