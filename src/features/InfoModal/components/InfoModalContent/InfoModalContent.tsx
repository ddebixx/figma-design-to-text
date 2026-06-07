import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { InfoModalSteps } from '@/features/InfoModal/components/InfoModalSteps'
import { InfoModalWarning } from '@/features/InfoModal/components/InfoModalWarning'
import { INFO_MODAL_CONTENT_CLASS } from '@/features/InfoModal/consts/infoModalStyles'

export const InfoModalContent = () => {
  const { t } = useTranslation()

  const descriptionClass = twMerge('text-xs leading-relaxed text-zinc-400')

  const bodyClass = twMerge('flex flex-col gap-4')

  return (
    <DialogContent className={INFO_MODAL_CONTENT_CLASS}>
      <DialogHeader>
        <DialogTitle className="text-base text-zinc-100">{t('infoModal.title')}</DialogTitle>
        <DialogDescription className={descriptionClass}>
          {t('infoModal.description')}
        </DialogDescription>
      </DialogHeader>

      <div className={bodyClass}>
        <InfoModalSteps />
        <InfoModalWarning />
      </div>
    </DialogContent>
  )
}
