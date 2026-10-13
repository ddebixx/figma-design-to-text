import type { JsonRecord } from './jsonValue'
import { summarizeReaction } from './summarizeReaction'

export const serializePrototypeInteractions = async (node: SceneNode): Promise<JsonRecord> => {
  if (!('reactions' in node) || node.reactions.length === 0) {
    return {}
  }

  return {
    reactions: await Promise.all(node.reactions.map((reaction) => summarizeReaction(reaction))),
  }
}
