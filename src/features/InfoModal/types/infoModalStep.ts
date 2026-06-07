import type { LucideIcon } from 'lucide-react'

export const InfoModalStepId = {
  SELECT_FRAME: 'selectFrame',
  CHOOSE_SETTINGS: 'chooseSettings',
  CONVERT_AND_PREVIEW: 'convertAndPreview',
  DOWNLOAD_EXPORT: 'downloadExport',
} as const

export type InfoModalStepId = (typeof InfoModalStepId)[keyof typeof InfoModalStepId]

export type InfoModalStepDefinition = {
  stepId: InfoModalStepId
  icon: LucideIcon
}
