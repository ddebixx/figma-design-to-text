import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { SECONDARY_BUTTON_CLASS } from '@/features/Converter/consts/glassPanelStyles'

type DownloadActionButtonProps = {
  isDownloading: boolean
  isDisabled: boolean
  onDownloadClick: () => void
}

export const DownloadActionButton = ({
  isDownloading,
  isDisabled,
  onDownloadClick,
}: DownloadActionButtonProps) => {
  const { t } = useTranslation()

  const buttonClass = twMerge(SECONDARY_BUTTON_CLASS, (isDisabled || isDownloading) && 'opacity-50')

  return (
    <Button
      type="button"
      variant="outline"
      className={buttonClass}
      onClick={onDownloadClick}
      disabled={isDisabled || isDownloading}
      aria-busy={isDownloading}
    >
      {isDownloading ? <Spinner className="mr-2" /> : null}
      {isDownloading ? t('actions.downloading') : t('actions.download')}
    </Button>
  )
}
