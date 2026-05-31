import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { i18n } from '@/lib/i18n'
import { renderWithI18n } from '@/test/renderWithI18n'
import { LanguageSelect } from './LanguageSelect'

vi.mock('@/lib/i18n', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/i18n')>()

  return {
    ...actual,
    persistLanguage: vi.fn(),
  }
})

describe('LanguageSelect', () => {
  it('renders active language flag and changes language on selection', async () => {
    const user = userEvent.setup()
    const { persistLanguage } = await import('@/lib/i18n')

    await i18n.changeLanguage('en')
    renderWithI18n(<LanguageSelect />)

    const languageTrigger = screen.getByRole('combobox', { name: 'Language' })

    expect(languageTrigger).toHaveTextContent('🇺🇸')

    await user.click(languageTrigger)
    await user.click(screen.getByRole('option', { name: /Deutsch/ }))

    expect(i18n.language).toBe('de')
    expect(persistLanguage).toHaveBeenCalledWith('de')
  })
})
