import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { CodeDisplayLine } from '@/features/Converter/preview/buildJsonDisplayLines'
import { JsonCodeLine } from './JsonCodeLine'

const buildLine = (overrides: Partial<CodeDisplayLine> = {}): CodeDisplayLine => ({
  id: 'line-1',
  lineNumber: 1,
  tokens: [
    { id: 'token-1', content: 'plain', color: '' },
    { id: 'token-2', content: 'colored', color: '#ff0000' },
  ],
  ...overrides,
})

describe('JsonCodeLine', () => {
  it('renders line number and token spans', () => {
    render(<JsonCodeLine line={buildLine()} lineNumberClass="w-8 text-zinc-600" />)

    expect(screen.getByText('1')).toHaveClass('w-8')
    expect(screen.getByText('plain')).toBeInTheDocument()
    expect(screen.getByText('colored')).toHaveStyle({ color: '#ff0000' })
  })

  it('omits inline color when token color is empty', () => {
    render(
      <JsonCodeLine
        line={buildLine({ tokens: [{ id: 'token-1', content: 'no-color', color: '' }] })}
        lineNumberClass="w-7"
      />,
    )

    expect(screen.getByText('no-color')).not.toHaveAttribute('style')
  })
})
