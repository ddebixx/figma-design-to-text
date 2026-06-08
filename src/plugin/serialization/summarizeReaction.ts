import type { JsonRecord, JsonValue } from './jsonValue'
import { summarizeAction } from './summarizeAction'
import { summarizeTrigger } from './summarizeTrigger'

const summarizeReactionActions = (reaction: Reaction): JsonValue[] => {
  if (reaction.actions && reaction.actions.length > 0) {
    return reaction.actions.map(summarizeAction)
  }

  if (reaction.action) {
    return [summarizeAction(reaction.action)]
  }

  return []
}

export const summarizeReaction = (reaction: Reaction): JsonRecord => {
  const summary: JsonRecord = {
    actions: summarizeReactionActions(reaction),
  }

  if (reaction.trigger) {
    summary.trigger = summarizeTrigger(reaction.trigger)
  }

  return summary
}
