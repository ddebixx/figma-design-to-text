import type { JsonObject } from '@/utils/isJsonObject'

export type NodeDisplayProperties = {
  nodeName: string
  elementKind: string
  nodeLabel: string
  dimensions: string
  fill: string
  characters: string
}

export const resolveNodeDisplayProperties = (node: JsonObject): NodeDisplayProperties => {
  const hasDimensions = typeof node.width === 'number' && typeof node.height === 'number'

  return {
    nodeName: String(node.name),
    elementKind: typeof node.elementKind === 'string' ? node.elementKind : String(node.type),
    nodeLabel: typeof node.elementLabel === 'string' ? node.elementLabel : String(node.name),
    dimensions: hasDimensions
      ? `${Math.round(node.width as number)}x${Math.round(node.height as number)}`
      : '',
    fill: typeof node.fill === 'string' ? String(node.fill) : '',
    characters: typeof node.characters === 'string' ? node.characters.replace(/\n/g, ' ') : '',
  }
}
