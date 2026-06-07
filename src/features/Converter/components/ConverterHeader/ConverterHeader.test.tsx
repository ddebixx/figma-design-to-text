import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ConverterHeader } from '@/features/Converter/components/ConverterHeader'
import { renderWithI18n } from '@/test/renderWithI18n'

describe('ConverterHeader', () => {
  it('renders title, description, info trigger, and language select', () => {
    renderWithI18n(<ConverterHeader />)

    expect(screen.getByRole('heading', { level: 1, name: 'Figson Converter' })).toBeInTheDocument()
    expect(screen.getByText('Convert Figma frames to AI-ready exports')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'How to use' })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: 'Language' })).toBeInTheDocument()
  })
})
