import { FIGMA_MIXED_SENTINEL, type JsonRecord, type JsonValue } from './jsonValue'

export function summarizePaints(paints: ReadonlyArray<Paint> | typeof figma.mixed): JsonValue {
  if (paints === figma.mixed) {
    return FIGMA_MIXED_SENTINEL
  }

  return paints.filter((paint) => paint.visible !== false).map(summarizePaint)
}

function summarizePaint(paint: Paint): JsonRecord {
  const summary: JsonRecord = {
    type: paint.type,
  }

  if (paint.opacity !== undefined) {
    summary.opacity = paint.opacity
  }

  if (paint.type === 'SOLID') {
    summary.color = formatRgbColor(paint.color)
    return summary
  }

  if (
    paint.type === 'GRADIENT_LINEAR' ||
    paint.type === 'GRADIENT_RADIAL' ||
    paint.type === 'GRADIENT_ANGULAR' ||
    paint.type === 'GRADIENT_DIAMOND'
  ) {
    summary.stopCount = paint.gradientStops.length
    return summary
  }

  if (paint.type === 'IMAGE') {
    summary.scaleMode = paint.scaleMode
    return summary
  }

  if (paint.type === 'PATTERN') {
    summary.sourceNodeId = paint.sourceNodeId
    return summary
  }

  return summary
}

function formatRgbColor(color: RGB | RGBA): string {
  const red = Math.round(color.r * 255)
  const green = Math.round(color.g * 255)
  const blue = Math.round(color.b * 255)

  if ('a' in color && color.a < 1) {
    const alpha = Math.round(color.a * 100) / 100
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`
  }

  const hexRed = red.toString(16).padStart(2, '0')
  const hexGreen = green.toString(16).padStart(2, '0')
  const hexBlue = blue.toString(16).padStart(2, '0')

  return `#${hexRed}${hexGreen}${hexBlue}`
}
