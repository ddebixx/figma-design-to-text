import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { PRIMARY_BUTTON_CLASS } from '@/features/Converter/consts/glassPanelStyles'

type ConvertActionButtonProps = {
  isProcessing: boolean
  onConvertClick: () => void
}

export const ConvertActionButton = ({ isProcessing, onConvertClick }: ConvertActionButtonProps) => {
  const { t } = useTranslation()

  const buttonClass = twMerge(PRIMARY_BUTTON_CLASS, isProcessing && 'opacity-70')

  return (
    <Button
      type="button"
      className={buttonClass}
      onClick={onConvertClick}
      disabled={isProcessing}
      aria-busy={isProcessing}
    >
      {isProcessing ? <Spinner className="mr-2" /> : null}
      {isProcessing ? t('actions.converting') : t('actions.convert')}
    </Button>
  )
}
