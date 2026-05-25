import type { ExportDetailLevel } from '@/features/Converter/export/types/exportSettings'
import {
  BALANCED_NODE_OMIT_KEYS,
  EFFICIENT_NODE_OMIT_KEYS,
} from '@/features/Converter/export/compress/compressionKeys'
import {
  flattenWrappedFrame,
  getNodeChildren,
  omitKeysFromNode,
  simplifyNodeFills,
} from '@/features/Converter/export/compress/nodeCompressionHelpers'
import type { JsonObject } from '@/utils/isJsonObject'

type NodeCompressionConfig = {
  omitKeys: ReadonlySet<string>
  shouldFlattenFrames: boolean
  shouldSimplifyFills: boolean
}

const NODE_COMPRESSION_CONFIG: Record<string, NodeCompressionConfig> = {
  balanced: {
    omitKeys: new Set(BALANCED_NODE_OMIT_KEYS),
    shouldFlattenFrames: false,
    shouldSimplifyFills: false,
  },
  efficient: {
    omitKeys: new Set(EFFICIENT_NODE_OMIT_KEYS),
    shouldFlattenFrames: true,
    shouldSimplifyFills: true,
  },
}

const applyNodeCompression = (node: JsonObject, config: NodeCompressionConfig): JsonObject => {
  const flattenedNode = config.shouldFlattenFrames ? flattenWrappedFrame(node) : node
  const strippedNode = omitKeysFromNode(flattenedNode, config.omitKeys)

  return config.shouldSimplifyFills ? simplifyNodeFills(strippedNode) : strippedNode
}

export const compressNodeByDetailLevel = (
  node: JsonObject,
  detailLevel: ExportDetailLevel,
): JsonObject => {
  if (detailLevel === 'precise') {
    return node
  }

  const config = NODE_COMPRESSION_CONFIG[detailLevel]
  const compressedNode = applyNodeCompression(node, config)
  const children = getNodeChildren(compressedNode)

  if (children.length === 0) {
    return compressedNode
  }

  return {
    ...compressedNode,
    children: children.map((child) => compressNodeByDetailLevel(child, detailLevel)),
  }
}
