import { getNodeChildren } from '@/features/Converter/export/compress/nodeCompressionHelpers'
import { resolveNodeDisplayProperties } from '@/features/Converter/export/format/resolveNodeDisplayProperties'
import type { ExportRenderablePayload } from '@/types/conversionPayloadSchema'
import type { JsonObject } from '@/utils/isJsonObject'

const formatNodeAsMarkdown = (node: JsonObject, depth: number): string => {
  const indent = '  '.repeat(depth)
  const { elementKind, nodeLabel, dimensions, fill, characters } =
    resolveNodeDisplayProperties(node)
  const size = dimensions ? ` (${dimensions})` : ''
  const fillPart = fill ? ` · ${fill}` : ''
  const chars = characters ? `: "${characters}"` : ''
  const line = `${indent}- **${elementKind}** ${nodeLabel}${size}${fillPart}${chars}`
  const children = getNodeChildren(node)
  const childLines = children.map((child) => formatNodeAsMarkdown(child, depth + 1))

  return [line, ...childLines].join('\n')
}

export const formatPayloadAsMarkdown = (payload: ExportRenderablePayload): string => {
  const pageName = typeof payload.meta.pageName === 'string' ? payload.meta.pageName : 'Selection'
  const sections = payload.nodes.map((node) => {
    const sectionTitle = String(node.name)
    return `## ${sectionTitle}\n${formatNodeAsMarkdown(node, 0)}`
  })

  return [`# ${pageName}`, ...sections].join('\n\n')
}
