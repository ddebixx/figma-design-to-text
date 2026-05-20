import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import './index.css'
import { App } from '@/App'
import { i18n, waitForI18n } from '@/lib/i18n'

const ROOT_ELEMENT_ID = 'root'

const displayBootstrapError = (message: string): void => {
  document.body.textContent = message
}

const renderApp = (rootElement: HTMLElement): void => {
  createRoot(rootElement).render(
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </StrictMode>,
  )
}

const bootstrapApp = (): void => {
  const rootElement = document.getElementById(ROOT_ELEMENT_ID)

  if (!rootElement) {
    displayBootstrapError(
      'Root element not found. Ensure index.html contains a div with id="root".',
    )
    return
  }

  waitForI18n()
    .then(() => renderApp(rootElement))
    .catch((error: unknown) => {
      const errorMessage = error instanceof Error ? error.message : 'Failed to initialize i18n'
      rootElement.textContent = errorMessage
    })
}

const scheduleBootstrapOnDocumentReady = (): void => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapApp)
    return
  }

  bootstrapApp()
}

scheduleBootstrapOnDocumentReady()
