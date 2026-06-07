import { DownloadIcon, FrameIcon, ScanEyeIcon, Settings2Icon } from 'lucide-react'
import {
  type InfoModalStepDefinition,
  InfoModalStepId,
} from '@/features/InfoModal/types/infoModalStep'

export const INFO_MODAL_STEPS: InfoModalStepDefinition[] = [
  {
    stepId: InfoModalStepId.SELECT_FRAME,
    icon: FrameIcon,
  },
  {
    stepId: InfoModalStepId.CHOOSE_SETTINGS,
    icon: Settings2Icon,
  },
  {
    stepId: InfoModalStepId.CONVERT_AND_PREVIEW,
    icon: ScanEyeIcon,
  },
  {
    stepId: InfoModalStepId.DOWNLOAD_EXPORT,
    icon: DownloadIcon,
  },
]
