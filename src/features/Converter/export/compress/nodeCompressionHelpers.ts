import { isJsonObject, type JsonObject } from '@/utils/isJsonObject'

export const getNodeChildren = (node: JsonObject): JsonObject[] => {
  const children = node.children

  if (!Array.isArray(children)) {
    return []
  }

  return children.filter(isJsonObject)
}

export const omitKeysFromNode = (node: JsonObject, omitKeys: ReadonlySet<string>): JsonObject => {
  const nextNode: JsonObject = {}

  for (const [key, value] of Object.entries(node)) {
    if (omitKeys.has(key)) {
      continue
    }

    nextNode[key] = value
  }

  return nextNode
}

export const simplifyNodeFills = (node: JsonObject): JsonObject => {
  const fills = node.fills

  if (!Array.isArray(fills) || fills.length === 0) {
    return node
  }

  const firstFill = fills[0]

  if (!isJsonObject(firstFill)) {
    return node
  }

  const color = firstFill.color

  if (typeof color !== 'string') {
    return node
  }

  const { fills: _fills, ...nodeWithoutFills } = node

  return { ...nodeWithoutFills, fill: color }
}

export const flattenWrappedFrame = (node: JsonObject): JsonObject => {
  const children = getNodeChildren(node)

  if (node.type !== 'FRAME' || children.length !== 1 || typeof node.characters === 'string') {
    return node
  }

  const wrappedChild = children[0]
  const mergedName = `${String(node.name)}/${String(wrappedChild.name)}`

  return { ...wrappedChild, name: mergedName }
}
