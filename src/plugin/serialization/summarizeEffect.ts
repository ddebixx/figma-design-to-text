import type { JsonRecord } from './jsonValue'

const formatEffectColor = (color: RGBA): string => {
  const red = Math.round(color.r * 255)
  const green = Math.round(color.g * 255)
  const blue = Math.round(color.b * 255)
  const alpha = Math.round(color.a * 100) / 100

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

export function summarizeEffects(effects: ReadonlyArray<Effect>): JsonRecord[] {
  return effects.filter((effect) => effect.visible !== false).map(summarizeEffect)
}

function summarizeEffect(effect: Effect): JsonRecord {
  const summary: JsonRecord = {
    type: effect.type,
  }

  if (effect.type === 'DROP_SHADOW' || effect.type === 'INNER_SHADOW') {
    summary.radius = effect.radius
    if (effect.spread !== undefined) {
      summary.spread = effect.spread
    }
    summary.color = formatEffectColor(effect.color)
    summary.offset = {
      x: effect.offset.x,
      y: effect.offset.y,
    }
    summary.blendMode = effect.blendMode
    return summary
  }

  if (effect.type === 'LAYER_BLUR' || effect.type === 'BACKGROUND_BLUR') {
    summary.radius = effect.radius
  }

  return summary
}
