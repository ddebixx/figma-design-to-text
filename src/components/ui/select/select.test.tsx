import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './select'

const ControlledSelect = ({
  position = 'item-aligned' as 'item-aligned' | 'popper',
  triggerSize = 'default' as 'default' | 'sm',
}) => {
  const [value, setValue] = useState('alpha')

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger size={triggerSize} aria-label="Choose option">
        <SelectValue placeholder="Pick one" />
      </SelectTrigger>
      <SelectContent position={position} align="start" className="test-content">
        <SelectGroup className="test-group">
          <SelectLabel>Group label</SelectLabel>
          <SelectItem value="alpha">Alpha</SelectItem>
          <SelectSeparator className="test-separator" />
          <SelectItem value="beta">Beta</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

describe('Select', () => {
  it('renders trigger, value, and grouped items', async () => {
    const user = userEvent.setup()

    render(<ControlledSelect />)

    const trigger = screen.getByRole('combobox', { name: 'Choose option' })

    expect(trigger).toHaveAttribute('data-slot', 'select-trigger')
    expect(trigger).toHaveAttribute('data-size', 'default')

    await user.click(trigger)

    const listbox = screen.getByRole('listbox')

    expect(within(listbox).getByText('Group label')).toHaveAttribute('data-slot', 'select-label')
    expect(within(listbox).getByRole('option', { name: 'Alpha' })).toHaveAttribute(
      'data-slot',
      'select-item',
    )
    expect(within(listbox).getByRole('option', { name: 'Beta' })).toBeInTheDocument()

    await user.click(within(listbox).getByText('Beta'))

    expect(trigger).toHaveTextContent('Beta')
  })

  it('renders small trigger size', () => {
    render(<ControlledSelect triggerSize="sm" />)

    expect(screen.getByRole('combobox')).toHaveAttribute('data-size', 'sm')
  })

  it('renders popper positioned content', async () => {
    const user = userEvent.setup()

    render(<ControlledSelect position="popper" />)

    await user.click(screen.getByRole('combobox'))

    const content = document.querySelector('[data-slot="select-content"]')

    expect(content).toHaveAttribute('data-align-trigger', 'false')
    expect(content).toHaveClass('test-content')
  })

  it('renders item-aligned positioned content', async () => {
    const user = userEvent.setup()

    render(<ControlledSelect position="item-aligned" />)

    await user.click(screen.getByRole('combobox'))

    const content = document.querySelector('[data-slot="select-content"]')

    expect(content).toHaveAttribute('data-align-trigger', 'true')
  })

  it('forwards onOpenChange from root select', async () => {
    const user = userEvent.setup()
    const handleOpenChange = vi.fn()

    render(
      <Select onOpenChange={handleOpenChange}>
        <SelectTrigger aria-label="Open select">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="one">One</SelectItem>
        </SelectContent>
      </Select>,
    )

    await user.click(screen.getByRole('combobox'))

    expect(handleOpenChange).toHaveBeenCalledWith(true)
  })
})
