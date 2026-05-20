import type { JsonRecord } from './jsonValue'

type InferElementSemanticsParams = {
  nodeType: SceneNode['type']
  nodeName: string
}

const ICON_NAME_PATTERN = /icon|ic\/|glyph|symbol/i
const LOGO_NAME_PATTERN = /logo|brand/i
const ILLUSTRATION_NAME_PATTERN = /illustration|illust|graphic|artwork/i

export function inferElementSemantics(params: InferElementSemanticsParams): JsonRecord {
  const trimmedName = params.nodeName.trim()

  if (trimmedName.length === 0) {
    return {}
  }

  const elementKind = resolveElementKind(params.nodeType, trimmedName)

  return {
    elementKind,
    elementLabel: trimmedName,
  }
}

function resolveElementKind(nodeType: SceneNode['type'], nodeName: string): string {
  if (nodeType === 'TEXT' || nodeType === 'TEXT_PATH') {
    return 'text'
  }

  if (nodeType === 'INSTANCE') {
    return 'component-instance'
  }

  if (nodeType === 'COMPONENT' || nodeType === 'COMPONENT_SET') {
    return 'component'
  }

  if (nodeType === 'FRAME') {
    return 'frame'
  }

  if (nodeType === 'GROUP' || nodeType === 'SECTION') {
    return 'group'
  }

  if (isVectorLikeType(nodeType)) {
    return resolveGraphicKind(nodeName)
  }

  return nodeType.toLowerCase().replace(/_/g, '-')
}

function isVectorLikeType(nodeType: SceneNode['type']): boolean {
  return (
    nodeType === 'VECTOR' ||
    nodeType === 'BOOLEAN_OPERATION' ||
    nodeType === 'STAR' ||
    nodeType === 'POLYGON' ||
    nodeType === 'LINE' ||
    nodeType === 'ELLIPSE' ||
    nodeType === 'RECTANGLE'
  )
}

function resolveGraphicKind(nodeName: string): string {
  if (LOGO_NAME_PATTERN.test(nodeName)) {
    return 'logo'
  }

  if (ICON_NAME_PATTERN.test(nodeName)) {
    return 'icon'
  }

  if (ILLUSTRATION_NAME_PATTERN.test(nodeName)) {
    return 'illustration'
  }

  return 'shape'
}
