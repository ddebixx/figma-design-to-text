import { ImageIcon, TriangleAlertIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
import { Separator } from '@/components/ui/separator'
import { INFO_MODAL_WARNING_CLASS } from '@/features/InfoModal/consts/infoModalStyles'

export const InfoModalWarning = () => {
  const { t } = useTranslation()

  const warningTitleClass = twMerge('flex items-center gap-2 text-sm font-medium')

  const warningTextClass = twMerge('mt-2 text-xs leading-relaxed text-amber-100/90')

  const screenshotTipClass = twMerge(
    'mt-3 flex items-start gap-2 rounded-md border border-amber-500/20 bg-amber-500/5 px-2.5 py-2 text-xs leading-relaxed text-amber-50/90',
  )

  return (
    <section aria-labelledby="info-modal-warning-title" className={INFO_MODAL_WARNING_CLASS}>
      <h3 id="info-modal-warning-title" className={warningTitleClass}>
        <TriangleAlertIcon className="size-4 shrink-0 text-amber-400" aria-hidden />
        {t('infoModal.warning.title')}
      </h3>
      <p className={warningTextClass}>{t('infoModal.warning.description')}</p>
      <Separator className="my-3 bg-amber-500/20" />
      <p className={screenshotTipClass}>
        <ImageIcon className="mt-0.5 size-4 shrink-0 text-amber-300" aria-hidden />
        <span>{t('infoModal.warning.screenshotTip')}</span>
      </p>
    </section>
  )
}
