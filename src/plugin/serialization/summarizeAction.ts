import { type JsonRecord, serializeFigmaValue } from './jsonValue'
import { resolveDestinationNodeName } from './resolveDestinationNodeName'
import { summarizeTransition } from './summarizeTransition'

const summarizeNodeAction = (action: Extract<Action, { type: 'NODE' }>): JsonRecord => {
  const summary: JsonRecord = {
    type: action.type,
    navigation: action.navigation,
  }

  if (action.destinationId) {
    summary.destinationId = action.destinationId
    summary.destinationName = resolveDestinationNodeName(action.destinationId)
  }

  if (action.transition) {
    summary.transition = summarizeTransition(action.transition)
  }

  if (action.resetScrollPosition !== undefined) {
    summary.resetScrollPosition = action.resetScrollPosition
  }

  if (action.resetInteractiveComponents !== undefined) {
    summary.resetInteractiveComponents = action.resetInteractiveComponents
  }

  return summary
}

export const summarizeAction = (action: Action): JsonRecord => {
  if (action.type === 'BACK' || action.type === 'CLOSE') {
    return { type: action.type }
  }

  if (action.type === 'URL') {
    const summary: JsonRecord = {
      type: action.type,
      url: action.url,
    }

    if (action.openInNewTab !== undefined) {
      summary.openInNewTab = action.openInNewTab
    }

    return summary
  }

  if (action.type === 'NODE') {
    return summarizeNodeAction(action)
  }

  if (action.type === 'UPDATE_MEDIA_RUNTIME') {
    return serializeFigmaValue(action) as JsonRecord
  }

  return serializeFigmaValue(action) as JsonRecord
}
