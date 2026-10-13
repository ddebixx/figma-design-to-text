import { inferElementSemantics } from './inferElementSemantics'
import { compactRecord, type JsonRecord, serializeFigmaValue } from './jsonValue'
import { serializePrototypeInteractions } from './serializePrototypeInteractions'
import { serializeRelativeTransform } from './serializeRelativeTransform'
import { summarizeEffects } from './summarizeEffect'
import { summarizePaints } from './summarizePaint'

export async function serializeSceneNode(node: SceneNode): Promise<JsonRecord> {
  const [instanceFields, childrenField] = await Promise.all([
    buildInstanceFields(node),
    buildChildrenField(node),
  ])
  const prototypeInteractions = await serializePrototypeInteractions(node)

  return compactRecord([
    buildIdentityFields(node),
    inferElementSemantics({ nodeType: node.type, nodeName: node.name }),
    buildSceneFlags(node),
    buildGeometryFields(node),
    serializeRelativeTransform(node),
    buildBlendFields(node),
    buildStrokeSummary(node),
    buildConstraintFields(node),
    buildAutoLayoutFields(node),
    buildFrameFields(node),
    buildTextFields(node),
    instanceFields,
    buildComponentFields(node),
    buildShapeFields(node),
    prototypeInteractions,
    childrenField,
  ])
}

function buildIdentityFields(node: SceneNode): JsonRecord {
  return {
    id: node.id,
    name: node.name,
    type: node.type,
  }
}

function buildSceneFlags(node: SceneNode): JsonRecord {
  return {
    visible: node.visible,
    locked: node.locked,
  }
}

function buildGeometryFields(node: SceneNode): JsonRecord {
  if (!('width' in node)) {
    return {}
  }

  const fields: JsonRecord = {
    x: node.x,
    y: node.y,
    width: node.width,
    height: node.height,
  }

  if ('rotation' in node && node.rotation !== 0) {
    fields.rotation = node.rotation
  }

  if ('layoutSizingHorizontal' in node) {
    fields.layoutSizingHorizontal = node.layoutSizingHorizontal
  }

  if ('layoutSizingVertical' in node) {
    fields.layoutSizingVertical = node.layoutSizingVertical
  }

  return fields
}

function buildBlendFields(node: SceneNode): JsonRecord {
  if (!('opacity' in node)) {
    return {}
  }

  const fields: JsonRecord = {
    opacity: node.opacity,
    blendMode: node.blendMode,
  }

  if ('fills' in node) {
    fields.fills = summarizePaints(node.fills)
  }

  if ('effects' in node) {
    fields.effects = summarizeEffects(node.effects)
  }

  return fields
}

function buildStrokeSummary(node: SceneNode): JsonRecord {
  if (!('strokes' in node)) {
    return {}
  }

  const strokeWeight = node.strokeWeight

  return {
    strokeWeight: strokeWeight === figma.mixed ? 'MIXED' : strokeWeight,
    strokes: summarizePaints(node.strokes),
  }
}

function buildConstraintFields(node: SceneNode): JsonRecord {
  if (!('constraints' in node)) {
    return {}
  }

  return { constraints: serializeFigmaValue(node.constraints) }
}

function buildAutoLayoutFields(node: SceneNode): JsonRecord {
  if (!('layoutMode' in node) || node.layoutMode === 'NONE') {
    return {}
  }

  const fields: JsonRecord = {
    layoutMode: node.layoutMode,
    primaryAxisAlignItems: node.primaryAxisAlignItems,
    counterAxisAlignItems: node.counterAxisAlignItems,
    paddingTop: node.paddingTop,
    paddingRight: node.paddingRight,
    paddingBottom: node.paddingBottom,
    paddingLeft: node.paddingLeft,
    itemSpacing: node.itemSpacing,
  }

  if ('layoutAlign' in node) {
    fields.layoutAlign = node.layoutAlign
    fields.layoutGrow = node.layoutGrow
  }

  return fields
}

function buildFrameFields(node: SceneNode): JsonRecord {
  if (
    node.type !== 'FRAME' &&
    node.type !== 'COMPONENT' &&
    node.type !== 'INSTANCE' &&
    node.type !== 'COMPONENT_SET'
  ) {
    return {}
  }

  return { clipsContent: node.clipsContent }
}

function buildTextFields(node: SceneNode): JsonRecord {
  if (node.type !== 'TEXT') {
    return {}
  }

  return {
    characters: node.characters,
    fontSize: serializeFigmaValue(node.fontSize),
    fontName: serializeFigmaValue(node.fontName),
    textAlignHorizontal: node.textAlignHorizontal,
    textAlignVertical: node.textAlignVertical,
    textAutoResize: node.textAutoResize,
  }
}

async function buildInstanceFields(node: SceneNode): Promise<JsonRecord> {
  if (node.type !== 'INSTANCE') {
    return {}
  }

  const mainComponentFields = await readMainComponentFields(node)

  return {
    componentProperties: serializeFigmaValue(node.componentProperties),
    ...mainComponentFields,
  }
}

async function readMainComponentFields(node: InstanceNode): Promise<JsonRecord> {
  const mainComponent = await node.getMainComponentAsync()

  if (!mainComponent) {
    return {}
  }

  return {
    mainComponentName: mainComponent.name,
    mainComponentId: mainComponent.id,
  }
}

function buildComponentFields(node: SceneNode): JsonRecord {
  if (!('variantProperties' in node) || !node.variantProperties) {
    return {}
  }

  return { variantProperties: serializeFigmaValue(node.variantProperties) }
}

function buildShapeFields(node: SceneNode): JsonRecord {
  const fields: JsonRecord = {}

  if ('cornerRadius' in node) {
    fields.cornerRadius = serializeFigmaValue(node.cornerRadius)
  }

  if ('pointCount' in node) {
    fields.pointCount = node.pointCount
  }

  return fields
}

async function buildChildrenField(node: SceneNode): Promise<JsonRecord> {
  if (!('children' in node)) {
    return {}
  }

  return {
    children: await Promise.all(node.children.map((child) => serializeSceneNode(child))),
  }
}
