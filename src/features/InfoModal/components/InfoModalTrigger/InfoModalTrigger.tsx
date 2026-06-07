import { InfoIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { INFO_MODAL_TRIGGER_CLASS } from '@/features/InfoModal/consts/infoModalStyles'

export const InfoModalTrigger = () => {
  const { t } = useTranslation()

  return (
    <DialogTrigger asChild>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className={INFO_MODAL_TRIGGER_CLASS}
        aria-label={t('infoModal.triggerLabel')}
      >
        <InfoIcon className="size-4" aria-hidden />
      </Button>
    </DialogTrigger>
  )
}
