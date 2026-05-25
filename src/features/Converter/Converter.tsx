import { ConverterActions } from '@/features/Converter/components/ConverterActions'
import { ConverterHeader } from '@/features/Converter/components/ConverterHeader'
import { JsonOutputPanel } from '@/features/Converter/components/JsonOutputPanel'
import { APP_SHELL_CLASS } from '@/features/Converter/consts/glassPanelStyles'
import { useConverterWorkflow } from '@/features/Converter/workflow/hooks/useConverterWorkflow'

export const Converter = () => {
  const {
    previewOutput,
    hasPreviewOutput,
    exportSettings,
    isProcessing,
    isDownloading,
    statusMessage,
    handleConvertClick,
    handleDownloadClick,
    handleDetailLevelChange,
    handleOutputFormatChange,
  } = useConverterWorkflow()

  return (
    <div className={`${APP_SHELL_CLASS} flex flex-col gap-4`}>
      <ConverterHeader />
      <ConverterActions
        isProcessing={isProcessing}
        isDownloading={isDownloading}
        hasPreviewOutput={hasPreviewOutput}
        exportSettings={exportSettings}
        statusMessage={statusMessage}
        onConvertClick={handleConvertClick}
        onDownloadClick={handleDownloadClick}
        onDetailLevelChange={handleDetailLevelChange}
        onOutputFormatChange={handleOutputFormatChange}
      />
      <JsonOutputPanel
        previewOutput={previewOutput}
        hasPreviewOutput={hasPreviewOutput}
        outputFormat={exportSettings.outputFormat}
      />
    </div>
  )
}
