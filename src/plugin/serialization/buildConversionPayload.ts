import type { JsonRecord } from './jsonValue'
import { serializeSceneNode } from './serializeSceneNode'

export function buildConversionPayload(): JsonRecord {
  const selection = figma.currentPage.selection

  if (selection.length === 0) {
    throw new Error('No layers selected. Please select at least one frame or layer.')
  }

  return {
    meta: {
      fileName: figma.root.name,
      pageName: figma.currentPage.name,
      exportedAt: new Date().toISOString(),
      selectionCount: selection.length,
      exportMode: 'compact',
    },
    nodes: selection.map((node) => serializeSceneNode(node)),
  }
}
