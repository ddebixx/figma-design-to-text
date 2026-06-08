import { type JsonRecord, serializeFigmaValue } from './jsonValue'

export const serializeRelativeTransform = (node: SceneNode): JsonRecord => {
  if (!('relativeTransform' in node)) {
    return {}
  }

  return {
    relativeTransform: serializeFigmaValue(node.relativeTransform),
  }
}
