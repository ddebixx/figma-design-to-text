import { useEffect } from 'react'
import { parsePluginToUiMessage } from '@/types/pluginMessageSchema'
import type { PluginToUiMessage } from '@/types/shared'

type UsePluginMessagesOptions = {
  onMessage: (message: PluginToUiMessage) => void
}

export const usePluginMessages = ({ onMessage }: UsePluginMessagesOptions): void => {
  useEffect(() => {
    function handleWindowMessage(event: MessageEvent) {
      const pluginMessage = event.data?.pluginMessage
      const parsedMessage = parsePluginToUiMessage(pluginMessage)

      if (!parsedMessage) {
        return
      }

      onMessage(parsedMessage)
    }

    window.addEventListener('message', handleWindowMessage)
    return () => window.removeEventListener('message', handleWindowMessage)
  }, [onMessage])
}
