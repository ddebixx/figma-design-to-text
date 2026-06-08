import type { JsonRecord } from './jsonValue'
import { summarizeReaction } from './summarizeReaction'

export const serializePrototypeInteractions = (node: SceneNode): JsonRecord => {
  if (!('reactions' in node) || node.reactions.length === 0) {
    return {}
  }

  return {
    reactions: node.reactions.map(summarizeReaction),
  }
}
