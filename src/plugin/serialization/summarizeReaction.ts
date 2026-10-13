import type { JsonRecord, JsonValue } from './jsonValue'
import { summarizeAction } from './summarizeAction'
import { summarizeTrigger } from './summarizeTrigger'

const summarizeReactionActions = async (reaction: Reaction): Promise<JsonValue[]> => {
  if (reaction.actions && reaction.actions.length > 0) {
    return Promise.all(reaction.actions.map((action) => summarizeAction(action)))
  }

  if (reaction.action) {
    return Promise.all([summarizeAction(reaction.action)])
  }

  return []
}

export const summarizeReaction = async (reaction: Reaction): Promise<JsonRecord> => {
  const summary: JsonRecord = {
    actions: await summarizeReactionActions(reaction),
  }

  if (reaction.trigger) {
    summary.trigger = summarizeTrigger(reaction.trigger)
  }

  return summary
}
