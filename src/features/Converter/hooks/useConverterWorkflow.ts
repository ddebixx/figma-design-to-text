import { useCallback, useMemo, useState } from 'react'
import { INITIAL_CONVERSION_STATE } from '@/features/Converter/consts/conversionState'
import { applyConversionMessage } from '@/features/Converter/handlers/applyConversionMessage'
import { triggerConvertProcessing } from '@/features/Converter/handlers/triggerConvertProcessing'
import { triggerJsonDownload } from '@/features/Converter/handlers/triggerJsonDownload'
import { LoadingOperationType } from '@/features/Converter/types/loadingOperation'
import type { StatusMessageState } from '@/features/Converter/types/statusMessage'
import { IDLE_STATUS_MESSAGE } from '@/features/Converter/types/statusMessage'
import { usePluginMessages } from '@/hooks/usePluginMessages'
import type { ConversionState, PluginToUiMessage } from '@/types/shared'
import { formatJsonOutput } from '@/utils/formatJsonOutput'

export const useConverterWorkflow = () => {
  const [conversionState, setConversionState] = useState<ConversionState>(INITIAL_CONVERSION_STATE)
  const [statusMessage, setStatusMessage] = useState<StatusMessageState>(IDLE_STATUS_MESSAGE)
  const [loadingOperation, setLoadingOperation] = useState<LoadingOperationType>(
    LoadingOperationType.NONE,
  )

  const jsonOutput = useMemo(() => {
    if (conversionState.status !== 'success') {
      return ''
    }

    return formatJsonOutput(conversionState.payload)
  }, [conversionState])

  const handlePluginMessage = useCallback((message: PluginToUiMessage) => {
    applyConversionMessage({
      message,
      setConversionState,
      setLoadingOperation,
      setStatusMessage,
    })
  }, [])

  const handleConvertClick = useCallback(() => {
    triggerConvertProcessing({ setLoadingOperation, setStatusMessage })
  }, [])

  const handleDownloadClick = useCallback(() => {
    triggerJsonDownload({ conversionState, setLoadingOperation, setStatusMessage })
  }, [conversionState])

  usePluginMessages({ onMessage: handlePluginMessage })

  const isProcessing = loadingOperation === LoadingOperationType.PROCESSING
  const isDownloading = loadingOperation === LoadingOperationType.DOWNLOADING
  const hasJsonOutput = conversionState.status === 'success' && jsonOutput.length > 0

  return {
    jsonOutput,
    hasJsonOutput,
    isProcessing,
    isDownloading,
    statusMessage,
    handleConvertClick,
    handleDownloadClick,
  }
}
