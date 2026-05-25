import { useCallback, useMemo, useState } from 'react'
import { buildExportPreview } from '@/features/Converter/export/buildExportPreview'
import { DEFAULT_EXPORT_SETTINGS } from '@/features/Converter/export/consts/exportSettings'
import type {
  ExportDetailLevel,
  ExportOutputFormat,
  ExportSettings,
} from '@/features/Converter/export/types/exportSettings'
import { applyConversionMessage } from '@/features/Converter/workflow/handlers/applyConversionMessage'
import { triggerExportDownload } from '@/features/Converter/workflow/handlers/triggerExportDownload'
import { usePluginMessages } from '@/features/Converter/workflow/hooks/usePluginMessages'
import { LoadingOperationType } from '@/features/Converter/workflow/types/loadingOperation'
import type { StatusMessageState } from '@/features/Converter/workflow/types/statusMessage'
import { IDLE_STATUS_MESSAGE } from '@/features/Converter/workflow/types/statusMessage'
import { i18n } from '@/lib/i18n'
import { postConvertSelectionMessage } from '@/lib/postConvertSelectionMessage'
import type { ConversionState, PluginToUiMessage } from '@/types/shared'

const INITIAL_CONVERSION_STATE: ConversionState = { status: 'idle' }

export const useConverterWorkflow = () => {
  const [conversionState, setConversionState] = useState<ConversionState>(INITIAL_CONVERSION_STATE)
  const [exportSettings, setExportSettings] = useState<ExportSettings>(DEFAULT_EXPORT_SETTINGS)
  const [statusMessage, setStatusMessage] = useState<StatusMessageState>(IDLE_STATUS_MESSAGE)
  const [loadingOperation, setLoadingOperation] = useState<LoadingOperationType>(
    LoadingOperationType.NONE,
  )

  const previewOutput = useMemo(() => {
    if (conversionState.status !== 'success') {
      return ''
    }

    return buildExportPreview({
      payload: conversionState.payload,
      detailLevel: exportSettings.detailLevel,
      outputFormat: exportSettings.outputFormat,
    })
  }, [conversionState, exportSettings])

  const handlePluginMessage = useCallback((message: PluginToUiMessage) => {
    applyConversionMessage({
      message,
      setConversionState,
      setLoadingOperation,
      setStatusMessage,
    })
  }, [])

  const handleConvertClick = useCallback(() => {
    setLoadingOperation(LoadingOperationType.PROCESSING)
    setStatusMessage({ variant: 'info', text: i18n.t('status.processing') })
    postConvertSelectionMessage()
  }, [])

  const handleDownloadClick = useCallback(() => {
    triggerExportDownload({
      previewOutput,
      outputFormat: exportSettings.outputFormat,
      setLoadingOperation,
      setStatusMessage,
    })
  }, [previewOutput, exportSettings.outputFormat])

  const handleDetailLevelChange = useCallback((detailLevel: ExportDetailLevel) => {
    setExportSettings((currentSettings) => ({
      ...currentSettings,
      detailLevel,
    }))
  }, [])

  const handleOutputFormatChange = useCallback((outputFormat: ExportOutputFormat) => {
    setExportSettings((currentSettings) => ({
      ...currentSettings,
      outputFormat,
    }))
  }, [])

  usePluginMessages({ onMessage: handlePluginMessage })

  const isProcessing = loadingOperation === LoadingOperationType.PROCESSING
  const isDownloading = loadingOperation === LoadingOperationType.DOWNLOADING
  const hasPreviewOutput = conversionState.status === 'success' && previewOutput.length > 0

  return {
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
  }
}
