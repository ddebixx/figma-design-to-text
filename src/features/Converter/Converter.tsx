import { ConverterActions } from '@/features/Converter/components/ConverterActions'
import { ConverterHeader } from '@/features/Converter/components/ConverterHeader'
import { JsonOutputPanel } from '@/features/Converter/components/JsonOutputPanel'
import { APP_SHELL_CLASS } from '@/features/Converter/consts/glassPanelStyles'
import { useConverterWorkflow } from '@/features/Converter/hooks/useConverterWorkflow'

export const Converter = () => {
  const {
    jsonOutput,
    hasJsonOutput,
    isProcessing,
    isDownloading,
    statusMessage,
    handleConvertClick,
    handleDownloadClick,
  } = useConverterWorkflow()

  return (
    <div className={`${APP_SHELL_CLASS} flex flex-col gap-4`}>
      <ConverterHeader />
      <ConverterActions
        isProcessing={isProcessing}
        isDownloading={isDownloading}
        hasJsonOutput={hasJsonOutput}
        statusMessage={statusMessage}
        onConvertClick={handleConvertClick}
        onDownloadClick={handleDownloadClick}
      />
      <JsonOutputPanel jsonOutput={jsonOutput} hasJsonOutput={hasJsonOutput} />
    </div>
  )
}
