import { type RenderOptions, render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { I18nextProvider } from 'react-i18next'
import { i18n } from '@/lib/i18n'

type RenderWithI18nOptions = Omit<RenderOptions, 'wrapper'>

export const renderWithI18n = (ui: ReactElement, options: RenderWithI18nOptions = {}) => {
  return render(ui, {
    ...options,
    wrapper: ({ children }) => <I18nextProvider i18n={i18n}>{children}</I18nextProvider>,
  })
}
