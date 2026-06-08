import { type JsonRecord, serializeFigmaValue } from './jsonValue'

export const summarizeTransition = (transition: Transition): JsonRecord => {
  const summary: JsonRecord = {
    type: transition.type,
    duration: transition.duration,
    easing: serializeFigmaValue(transition.easing),
  }

  if ('direction' in transition) {
    summary.direction = transition.direction
  }

  if ('matchLayers' in transition) {
    summary.matchLayers = transition.matchLayers
  }

  return summary
}
