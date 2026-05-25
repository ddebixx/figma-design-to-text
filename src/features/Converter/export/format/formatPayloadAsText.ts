import { getNodeChildren } from '@/features/Converter/export/compress/nodeCompressionHelpers'
import { resolveNodeDisplayProperties } from '@/features/Converter/export/format/resolveNodeDisplayProperties'
import type { ExportRenderablePayload } from '@/types/conversionPayloadSchema'
import type { JsonObject } from '@/utils/isJsonObject'

const formatNodeAsText = (node: JsonObject, path: string): string => {
  const { nodeName, elementKind, dimensions, characters } = resolveNodeDisplayProperties(node)
  const nodePath = path.length > 0 ? `${path} > ${nodeName}` : nodeName
  const size = dimensions ? ` ${dimensions}` : ''
  const chars = characters ? `: "${characters}"` : ''
  const line = `${nodePath} [${elementKind}${size}]${chars}`
  const children = getNodeChildren(node)
  const childLines = children.map((child) => formatNodeAsText(child, nodePath))

  return [line, ...childLines].join('\n')
}

export const formatPayloadAsText = (payload: ExportRenderablePayload): string => {
  return payload.nodes.map((node) => formatNodeAsText(node, '')).join('\n')
}
