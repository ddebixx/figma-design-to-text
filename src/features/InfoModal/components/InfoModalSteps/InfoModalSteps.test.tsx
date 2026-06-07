import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { InfoModalSteps } from '@/features/InfoModal/components/InfoModalSteps'
import { INFO_MODAL_STEPS } from '@/features/InfoModal/consts/infoModalSteps'
import { renderWithI18n } from '@/test/renderWithI18n'

describe('InfoModalSteps', () => {
  it('renders all configured usage steps', () => {
    renderWithI18n(<InfoModalSteps />)

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(INFO_MODAL_STEPS).toHaveLength(4)
    expect(screen.getByText('Select a frame or component')).toBeInTheDocument()
    expect(screen.getByText('Choose detail level and format')).toBeInTheDocument()
    expect(screen.getByText('Convert and review the preview')).toBeInTheDocument()
    expect(screen.getByText('Download the export')).toBeInTheDocument()
  })
})
