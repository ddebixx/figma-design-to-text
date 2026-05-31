import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeAll } from 'vitest'
import { waitForI18n } from '@/lib/i18n'

beforeAll(async () => {
  await waitForI18n()
})

afterEach(() => {
  cleanup()
})
